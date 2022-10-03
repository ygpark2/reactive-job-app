import { Injectable } from '@angular/core';
import { AuthApiService } from '@app/@shared/services/auth.api.service';
import { Observable, of, from } from 'rxjs';
import { ServiceBuilder } from 'ts-retrofit';

import { RequestInterceptor, ResponseInterceptor } from '@app/@shared/http';
import { Credentials, CredentialsService } from './credentials.service';
import { User } from '@app/@shared/models/user/user';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface RegisterContext {
  email: string;
  password: string;
  checkPassword: string;
  name: string;
  nickname: string;
  phoneNumberPrefix: string;
  phoneNumber: string;
  website: string;
  agree: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authApiService: AuthApiService;

  constructor(private credentialsService: CredentialsService) {
    this.authApiService = new ServiceBuilder()
      .setRequestInterceptors(RequestInterceptor)
      .setResponseInterceptors(ResponseInterceptor)
      .build(AuthApiService);
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    const data = {
      username: context.username,
      token: '',
    };
    console.log('context.username -> ', context.username);
    console.log('context.password -> ', context.password);
    return from(
      this.authApiService.login({ username: context.username, password: context.password }).then((response) => {
        console.log('------------------- response ----------------------');
        console.log(response);
        data.token = response.headers['authorization'];
        console.log('data.token => ', data.token);
        this.credentialsService.setCredentials(data, context.remember);
        return data;
      })
    );
    // return of(data);
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
   register(context: RegisterContext): Observable<User> {
    // Replace by proper authentication call
    const userData = {
      name: context.name,
      nickName: context.nickname,
      email: context.email,
      phoneNumber: context.phoneNumberPrefix + " " + context.phoneNumber,
      website: context.website,
      password: context.password,
    };
    return from(
      this.authApiService.register(userData).then((response) => {
        console.log('------------------- response ----------------------');
        console.log(response);
        return response.data as User;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
