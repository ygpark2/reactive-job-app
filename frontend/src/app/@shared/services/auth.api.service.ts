import { Inject, Injectable, Injector } from '@angular/core';
import {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  BasePath,
  Header,
  Headers,
  Query,
  Queries,
  Field,
  Path,
  Body,
  BaseService,
  ServiceBuilder,
  Response,
} from 'ts-retrofit';
import { Observable } from 'rxjs';

import { PagedContentResponse } from '@app/@shared/models';
import { Login } from '@app/@shared/models/user/login';
import { User } from '@app/@shared/models/user/user';

export enum SearchKey {
  title = 'title',
  content = 'content',
  titleAndConten = 'titleAndConten',
}

@Injectable({
  providedIn: 'root',
})
@BasePath('/api/v1/users/')
export class AuthApiService extends BaseService {
  /*
  constructor(injector: Injector) {
    super(injector);
  }
  */

  @POST('login')
  async login(@Body login: Login): Promise<Response> {
    return <Response>{};
  }

  @POST('register')
  async register(@Body user: User): Promise<Response> {
    return <Response>{};
  }
}
