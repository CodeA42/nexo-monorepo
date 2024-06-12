import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorResponse } from '@nexo-monorepo/json-api-standard-shared';
import { AxiosError } from 'axios';

@Injectable()
export class HttpErrorService {
  static mapAxiosErrorToErrorResponseDto(error: AxiosError): ErrorResponse {
    return {
      errors: [
        {
          detail: 'Unknown error, developers are notified',
          status: error?.response?.status ?? 500,
          meta: {
            debug: {
              axiosError: {
                config: error?.config,
                response: { data: error?.response?.data, headers: error?.response?.headers },
              },
            },
          },
        },
      ],
      meta: {},
    };
  }

  throwHttpException(error: unknown): HttpException {
    if (this.isAxiosError(error)) {
      const responseStatus = error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;

      const exception = new HttpException(HttpErrorService.mapAxiosErrorToErrorResponseDto(error), responseStatus);

      throw exception;
    }

    throw error;
  }

  private isAxiosError(error: unknown): error is AxiosError {
    return Boolean((error as AxiosError)?.isAxiosError);
  }
}
