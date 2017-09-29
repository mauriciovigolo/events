import { Response } from 'express';
import { HeaderParam, Interceptor, processing, ResponseParam } from '@orchejs/rest';
import { logger } from '@orchejs/common';

@Interceptor('users/:uuid')
export class AuthenticationInterceptor {
  @processing()
  evaluate(@ResponseParam() req: Response, @HeaderParam('authentication') token) {
    logger.info('Token: ' + token);
  }
}
