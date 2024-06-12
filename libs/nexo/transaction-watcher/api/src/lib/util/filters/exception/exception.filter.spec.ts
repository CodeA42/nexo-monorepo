import {
  ArgumentsHost,
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { ExceptionFilter } from './exception.filter';
import { NexoTransactionWatcherConfiguration } from '../../../../';
import { ErrorResponse } from '@nexo-monorepo/json-api-standard-shared';

const mockHost = () => {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const getResponse = jest.fn().mockReturnValue({ status });
  const switchToHttp = jest.fn().mockReturnValue({ getResponse });
  const host = mock<ArgumentsHost>({ switchToHttp });

  return { host, switchToHttp, status, json };
};

describe('ExceptionFilter', () => {
  const testConfig: Partial<NexoTransactionWatcherConfiguration> = {
    OMIT_DEBUG_META_IN_RESPONSE: false,
  };
  let configServiceMock: MockProxy<
    ConfigService<NexoTransactionWatcherConfiguration>
  >;
  let filter: ExceptionFilter;
  beforeEach(async () => {
    configServiceMock = mock<
      ConfigService<NexoTransactionWatcherConfiguration>
    >({
      get: jest.fn().mockImplementation((key) => testConfig[key]),
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExceptionFilter,
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    filter = module.get<ExceptionFilter>(ExceptionFilter);
  });

  it('should log error', async () => {
    // @ts-expect-error Checking private field (implementation detail) whether the logger is logging
    // a solution to this might be to listen for "stdout", but this stdout can be coming from
    // other part of the code or the test runner.
    const loggerSpy = jest.spyOn(filter.logger, 'error');
    const { host } = mockHost();
    await filter.catch(new Error(), host);

    expect(loggerSpy).toHaveBeenCalled();
  });

  it('should return status code of 500 for unknown errors', async () => {
    const { host, status } = mockHost();

    const error = new TypeError("Cannot read property 'toString' of undefined");
    await filter.catch(error, host);
    expect(status).toHaveBeenCalledWith(500);

    const internalError = new InternalServerErrorException(
      "Cannot read property 'toString' of undefined",
    );
    await filter.catch(internalError, host);
    expect(status).toHaveBeenCalledWith(500);
  });

  describe('should return status code for 400 http exceptions', () => {
    it(`${BadRequestException.name} should return 400 status`, async () => {
      const { host, status } = mockHost();
      const badRequestException = new BadRequestException();
      await filter.catch(badRequestException, host);
      expect(status).toHaveBeenCalledWith(400);
    });

    it(`${UnauthorizedException.name} should return 401 status`, async () => {
      const { host, status } = mockHost();
      const unauthorizeExeption = new UnauthorizedException();
      await filter.catch(unauthorizeExeption, host);
      expect(status).toHaveBeenCalledWith(401);
    });

    it(`${ForbiddenException.name} should return 403 status`, async () => {
      const { host, status } = mockHost();
      const forbiddenException = new ForbiddenException();

      await filter.catch(forbiddenException, host);
      expect(status).toHaveBeenCalledWith(403);
    });

    it(`${NotFoundException.name} should return 404 status`, async () => {
      const { host, status } = mockHost();
      const notFoundException = new NotFoundException();
      await filter.catch(notFoundException, host);
      expect(status).toHaveBeenCalledWith(404);
    });
  });

  describe('all errors should be transformed to ErrorResponseDto', () => {
    describe('HTTP exceptions', () => {
      it('should show status, title, detail and response in meta', async () => {
        const { host, json } = mockHost();
        const message = 'Validation error';
        const error = new BadRequestException(message);
        await filter.catch(error, host);

        const expectedResult: ErrorResponse = {
          errors: [
            {
              title: 'Bad Request',
              status: 400,
              detail: message,
              meta: expect.objectContaining({ response: error.getResponse() }),
            },
          ],
          meta: expect.anything(),
        };

        expect(json).toHaveBeenCalledWith(expectedResult);
      });
      describe(InternalServerErrorException.name, () => {
        it('should expose debug meta, but not detail', async () => {
          const { host, json } = mockHost();
          const error = new InternalServerErrorException(
            'Something has went wrong',
          );
          await filter.catch(error, host);

          const expectedResult: ErrorResponse = {
            errors: [
              expect.objectContaining({
                title: 'Internal Server Error',
                meta: expect.objectContaining({ debug: expect.anything() }),
              }),
            ],
            meta: expect.anything(),
          };
          expect(json).toHaveBeenCalledWith(expectedResult);
        });
      });
    });

    it('TypeError should have 500 status, and 500 reason phrase as title ', async () => {
      const { host, json } = mockHost();
      const errorMessage = `This should be an error message`;
      const error = new TypeError(errorMessage);
      await filter.catch(error, host);

      const expectedResult: ErrorResponse = {
        errors: [
          {
            title: 'Internal Server Error',
            status: 500,
            meta: expect.anything(),
          },
        ],
        meta: expect.anything(),
      };

      expect(json).toHaveBeenCalledWith(expectedResult);
    });

    it('ErrorResponseDto should be kept', async () => {
      const { host, json } = mockHost();
      const body: ErrorResponse = {
        errors: [
          {
            title: 'Item title',
            code: 'item-error',
            meta: { itemMeta: 'value' },
          },
        ],
        meta: { metaValue: 'value' },
      };

      const error = new BadRequestException(body);
      await filter.catch(error, host);

      const expectedResult: ErrorResponse = {
        errors: [
          {
            title: 'Item title',
            code: 'item-error',
            meta: expect.objectContaining({ itemMeta: 'value' }),
          },
        ],
        meta: expect.objectContaining({ metaValue: 'value' }),
      };

      expect(json).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('transforming the error to a JSON seriarilizible form', () => {
    const isJSONSerializable = (obj: unknown) => {
      try {
        JSON.stringify(obj);
        return true;
      } catch {
        return false;
      }
    };

    it('when error object is passed', async () => {
      const { host, json } = mockHost();

      const error = new Error();

      await filter.catch(error, host);

      expect(json).toHaveBeenCalledWith(
        expect.toSatisfy((body) => isJSONSerializable(body)),
      );
    });

    it('when object with circular dependencies is passed', async () => {
      const { host, json } = mockHost();
      const circularObjectPartOne = { circularProperty: null };
      const circularObjectPartTwo = { circularProperty: circularObjectPartOne };

      // @ts-expect-error testing circular dependency
      circularObjectPartOne.circularProperty = circularObjectPartTwo;

      await filter.catch(circularObjectPartOne, host);

      expect(json).toHaveBeenCalledWith(
        expect.toSatisfy((body) => isJSONSerializable(body)),
      );
    });
  });

  describe('debug', () => {
    describe('exposing debug meta', () => {
      const haveDebugMeta = (dto: ErrorResponse): boolean => {
        return 'debug' in dto.meta;
      };

      const haveDebugMetaInErrorItems = (dto: ErrorResponse): boolean => {
        return dto.errors.some((error) => 'debug' in error.meta!);
      };

      it('when OMIT_DEBUG_META_IN_RESPONSE is set to true, omit ONLY debug meta', async () => {
        const newConfig: Partial<NexoTransactionWatcherConfiguration> = {
          ...testConfig,
          OMIT_DEBUG_META_IN_RESPONSE: true,
        };
        configServiceMock.get.mockImplementationOnce((key) => newConfig[key]);
        const { host, json } = mockHost();
        const itemDebugField = 'Meta item debug message';
        const metaDebugField = 'Meta debug message';
        const errorResponse: ErrorResponse = {
          errors: [{ meta: { debug: { itemDebugField } } }],
          meta: { debug: { metaDebugField } },
        };

        const error = new BadRequestException(errorResponse);
        await filter.catch(error, host);

        expect(json).toHaveBeenCalledWith(
          expect.toSatisfy((entry) => !haveDebugMeta(entry)),
        );
        expect(json).toHaveBeenCalledWith(
          expect.toSatisfy((entry) => !haveDebugMetaInErrorItems(entry)),
        );
      });

      it('when OMIT_DEBUG_META_IN_RESPONSE is set to true, do NOT omit meta', async () => {
        const newConfig: Partial<NexoTransactionWatcherConfiguration> = {
          ...testConfig,
          OMIT_DEBUG_META_IN_RESPONSE: true,
        };
        configServiceMock.get.mockImplementationOnce((key) => newConfig[key]);
        const { host, json } = mockHost();
        const itemMetaField = 'Meta item message';
        const metaField = 'Meta message';
        const errorResponse: ErrorResponse = {
          errors: [{ meta: { itemMetaField } }],
          meta: { metaField },
        };

        const error = new BadRequestException(errorResponse);
        await filter.catch(error, host);

        expect(json).toHaveBeenCalledWith({
          errors: expect.arrayContaining([
            expect.objectContaining({
              meta: expect.objectContaining({ itemMetaField }),
            }),
          ]),
          meta: expect.objectContaining({ metaField }),
        });
      });

      it(`when OMIT_DEBUG_META_IN_RESPONSE is set to false, don't omit debug meta`, async () => {
        const newConfig: Partial<NexoTransactionWatcherConfiguration> = {
          ...testConfig,
          OMIT_DEBUG_META_IN_RESPONSE: false,
        };
        configServiceMock.get.mockImplementationOnce((key) => newConfig[key]);
        const { host, json } = mockHost();
        const message = 'Meta message';
        const error = new Error(message);
        await filter.catch(error, host);

        expect(json).toHaveBeenCalledWith(expect.toSatisfy(haveDebugMeta));
        expect(json).toHaveBeenCalledWith(
          expect.toSatisfy(haveDebugMetaInErrorItems),
        );
      });
    });

    it('exposing stack trace', async () => {
      const { host, json } = mockHost();
      const message = 'Meta message';
      const error = new Error(message);
      await filter.catch(error, host);

      expect(json).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            debug: expect.objectContaining({ stack: expect.toBeString() }),
          }),
        }),
      );
    });
  });
});
