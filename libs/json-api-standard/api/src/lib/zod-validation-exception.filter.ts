import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ZodError } from 'zod';
import { ZodValidationException } from 'nestjs-zod';
import { FieldErrors } from '@nexo-monorepo/json-api-standard-shared';
import { toJsonApiErrorResponseDto } from './utils';

type ZodValidationExceptionFilterOptions = {
  shouldReturnSuccessStatusCodeOnError: boolean;
};

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(
    ZodValidationExceptionFilter.name,
  );
  private readonly shouldReturnSuccessStatusCodeOnError: boolean;

  constructor(
    {
      shouldReturnSuccessStatusCodeOnError,
    }: ZodValidationExceptionFilterOptions = {
      shouldReturnSuccessStatusCodeOnError: false,
    },
  ) {
    this.shouldReturnSuccessStatusCodeOnError =
      shouldReturnSuccessStatusCodeOnError;
  }

  catch(exception: ZodValidationException, host: ArgumentsHost) {
    const error = exception.getZodError();

    const fieldErrors = this.formatToFieldErrors(error);

    this.logger.error({
      message: 'Validation error',
      fieldErrors,
      stack: error.stack,
    });

    const responseJson = toJsonApiErrorResponseDto(fieldErrors);

    const response = host.switchToHttp().getResponse();

    if (this.shouldReturnSuccessStatusCodeOnError) {
      response.status(200).json();
    } else {
      response.status(400).json(responseJson);
    }
  }

  private formatToFieldErrors(error: ZodError): FieldErrors {
    const joinFieldPath = (path: (string | number)[]) => {
      return (
        path
          .filter((key) => typeof key === 'string')
          // format erroring fields like in core api v2
          .map((key, i) => (i === 0 ? key : `[${key}]`))
          .join('')
      );
    };

    const formattedErrors = error.errors.map(({ path, message }) => {
      return {
        property: joinFieldPath(path),
        message: message,
      };
    });

    return formattedErrors;
  }
}
