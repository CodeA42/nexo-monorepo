import { HttpModule as BaseHttpModule, HttpService } from '@nestjs/axios';
import { HttpStatus, Logger, Module, OnModuleInit } from '@nestjs/common';
import { AxiosError } from 'axios';
import { HttpErrorService } from './http-error.service';

@Module({
  imports: [BaseHttpModule],
  providers: [HttpErrorService],
  exports: [BaseHttpModule],
})
export class HttpModule implements OnModuleInit {
  private readonly logger = new Logger(HttpModule.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly httpErrorService: HttpErrorService,
  ) {}
  onModuleInit(): void {
    // We want axios to throw every status above 400 - Bad Request as an error
    this.httpService.axiosRef.defaults.validateStatus = (status: number) => status < HttpStatus.BAD_REQUEST;
    this.httpService.axiosRef.interceptors.response.use(
      (res) => {
        const { hostname, protocol, pathname, search } = new URL(res.config.url as string);

        this.logger.debug({
          message: `${res.config.url} - ${res.config.method}: [${res.status}, ${res.statusText}]`,
          status: res.status,
          statusText: res.statusText,
          url: res.config.url,
          method: res.config.method,
          pathname,
          search,
          hostname,
          protocol,
        });

        return res;
      },
      (error: AxiosError | Error) => {
        if ((error as AxiosError)?.isAxiosError) {
          const axiosError = error as AxiosError;
          const errorResponse = axiosError?.response;

          this.logger.error({
            message: `${errorResponse?.config?.url} - ${errorResponse?.config?.method}: [${errorResponse?.status}, ${errorResponse?.statusText}], message: ${error?.message}`,
            status: errorResponse?.status,
            url: errorResponse?.config?.url,
            params: errorResponse?.config?.params || null,
            stack: error?.stack,
          });
        } else {
          this.logger.error({ message: error?.message, stack: error?.stack });
        }

        return this.httpErrorService.throwHttpException(error);
      },
    );
  }
}
