import { User, userDA } from './user';
import {
  BodyParam,
  ErrorResponse,
  Get,
  HttpResponseCode,
  PathParam,
  Post,
  Put,
  RequestParam,
  RequestParamMapper,
  Route,
} from '@orchejs/rest';
import { PatternValidator } from '@orchejs/validators';

@Route('users')
export class UserRs {
  @Post()
  async createUser(@BodyParam() user): Promise<any> {
    try {
      const result = await userDA.create(user);
      return Promise.resolve(result);
    } catch (error) {
      let errorResponse = new ErrorResponse(
        'Erro na criação!',
        undefined,
        HttpResponseCode.InternalServerError
      );
      return Promise.reject(errorResponse);
    }
  }

  @Get(':uuid')
  getUser(@PathParam('uuid') uuid: number): User {
    userDA.findById(uuid)
    return null;
  }
}
