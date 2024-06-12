import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as BaseExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { getReasonPhrase } from 'http-status-codes';
import { isNil, omit } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { NexoTransactionWatcherConfiguration } from '../../../../';
import {
  ErrorResponse,
  ErrorResponseItem,
  errorResponseSchema,
} from '@nexo-monorepo/json-api-standard-shared';

@Catch()
export class ExceptionFilter implements BaseExceptionFilter {
  private readonly logger = new Logger(ExceptionFilter.name);
  constructor(
    private readonly configService: ConfigService<NexoTransactionWatcherConfiguration>,
  ) {}

  private static simplifyStackTrace(trace: string): string {
    const pattern = new RegExp(
      process.cwd().replace('([\\([*+])', '\\$1'),
      'g',
    );
    return trace?.replace(pattern, '');
  }
  private static getDebugStackTrace(exception: unknown): string {
    return ExceptionFilter.simplifyStackTrace(
      (() => {
        if (exception instanceof HttpException) {
          return exception.stack;
        }
        if (exception instanceof Error) {
          return exception.stack;
        }

        // try to parse a json api error
        const errorResponse = errorResponseSchema.safeParse(exception);
        if (errorResponse.success) {
          return (
            errorResponse.data.meta?.['axiosError']?.stack ||
            errorResponse.data?.meta?.['stack']
          );
        }

        return 'unknown stack trace';
      })(),
    );
  }
  private static getStatusCode(exception: unknown): HttpStatus {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
   * Removes the "debug" properties from the "meta" properties
   */
  private static clearDebugData(data: ErrorResponse): ErrorResponse {
    const metaWithoutDebug = omit(data.meta, 'debug');
    const errorsWithoutDebug = data.errors.map((error) => {
      const errorResponseItem: ErrorResponseItem = {
        ...error,
        meta: omit(error.meta, 'debug'),
      };

      return errorResponseItem;
    });
    return {
      ...data,
      meta: metaWithoutDebug,
      errors: errorsWithoutDebug,
    };
  }

  private static is500Error = (status: number): boolean =>
    status >= 500 && status < 600;

  private static getErrorItemDetailForHTTPException(
    exception: HttpException,
  ): string | undefined {
    if (this.is500Error(exception.getStatus())) {
      return undefined;
    }
    if (exception.message) {
      return exception.message;
    }
    const response = exception.getResponse();

    if (typeof response === 'string') {
      return response;
    }

    return undefined;
  }

  private static getItemMetaForHTTPException(
    exception: HttpException,
  ): ErrorResponseItem['meta'] {
    const status = exception.getStatus();
    const response = exception.getResponse();
    if (this.is500Error(status)) {
      return { debug: { response } };
    }

    return { response };
  }

  /**
   * Since spreading operator(...) does not yield results on a error
   * see: https://stackoverflow.com/questions/53167026/what-is-the-reason-for-not-spread-es-6-spread-operator-javascript-error-object
   */
  private static extractErrorValues(error: unknown): unknown {
    if (isNil(error)) {
      return { errorIsNill: true };
    }

    const entries = Object.entries(Object.getOwnPropertyDescriptors(error)).map(
      ([key, { value }]) => [key, value],
    );
    return Object.fromEntries(entries);
  }

  private static createErrorResponseFromNotValidErrorResponseDto(
    exception: unknown,
  ): ErrorResponse {
    if (exception instanceof HttpException) {
      return {
        errors: [
          {
            status: exception.getStatus(),
            title: getReasonPhrase(exception.getStatus()),
            detail: this.getErrorItemDetailForHTTPException(exception),
            meta: this.getItemMetaForHTTPException(exception),
          },
        ],
        meta: {},
      };
    }
    const status = this.getStatusCode(exception);
    const debug = this.extractErrorValues(exception);
    return {
      errors: [
        {
          title: getReasonPhrase(status),
          status,
          meta: { debug },
        },
      ],
      meta: {},
    };
  }

  private static removeCircularDependencies(
    data: ErrorResponse,
  ): ErrorResponse {
    const seen = new WeakSet();
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#circular_references
    // this implmentation replaces also duplicated values, not only circular references
    const circularReplacer = (key: string, value: unknown): unknown => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return 'Potential circular dependency, removing property';
        }
        seen.add(value);
      }
      return value;
    };
    const flattedString = JSON.stringify(data, circularReplacer);
    const flatted = JSON.parse(flattedString);

    return flatted;
  }

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const response = host.switchToHttp().getResponse();
    try {
      this.logException(exception);
      const [status, responseBody] =
        await this.getHTTPStatusAndResponseBody(exception);

      response.status(status).json(responseBody);
    } catch (error) {
      this.logger.error(
        'Was not able to filter the error to the client',
        error,
        exception,
      );

      const fallbackErrorResponse: ErrorResponse = {
        errors: [
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            code: 'exception-filter',
            detail: 'Unknown error',
          },
        ],
        meta: {},
      };
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(fallbackErrorResponse);
    }
  }

  private logException(exception: unknown): void {
    const stack = ExceptionFilter.getDebugStackTrace(exception);
    const name = exception instanceof Error ? exception.name : 'Unknown error';

    return this.logger.error(name, stack);
  }

  private async getHTTPStatusAndResponseBody(
    exception: unknown,
  ): Promise<[HttpStatus, ErrorResponse]> {
    const body =
      exception instanceof HttpException ? exception.getResponse() : exception;

    const validatedErrorResponseValidResult =
      errorResponseSchema.safeParse(body);

    const validatedErrorResponseDto = validatedErrorResponseValidResult.success
      ? validatedErrorResponseValidResult.data
      : ExceptionFilter.createErrorResponseFromNotValidErrorResponseDto(
          exception,
        );

    const { meta } = validatedErrorResponseDto;
    const stack = ExceptionFilter.getDebugStackTrace(exception);
    const metaWithStackTrace = {
      ...meta,
      debug: { ...meta?.['debug'], stack },
    };

    const errorResponseDtoWithStackTrace: ErrorResponse = {
      ...validatedErrorResponseDto,
      meta: metaWithStackTrace,
    };

    const shouldOmitDebugData = this.configService.get(
      'OMIT_DEBUG_META_IN_RESPONSE',
    );
    const filteredErrorResponseDto = shouldOmitDebugData
      ? ExceptionFilter.clearDebugData(errorResponseDtoWithStackTrace)
      : errorResponseDtoWithStackTrace;

    const status = ExceptionFilter.getStatusCode(exception);

    const notCircular = ExceptionFilter.removeCircularDependencies(
      filteredErrorResponseDto,
    );

    return [status, notCircular];
  }
}
