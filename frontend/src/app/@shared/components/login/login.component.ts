import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoggerService } from '@app/@shared/services';
import { AuthenticationService } from '@app/@shared/modules/auth';

import { KakaoOAuth } from '@openauth/kakao';
import { NaverOAuth } from '@openauth/naver';

const log = new LoggerService('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;

  private kakaoOAuth: KakaoOAuth;
  private naverOAuth: NaverOAuth;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();

    this.kakaoOAuth = new KakaoOAuth({
      clientId: 'ab131dc8eadc11ecd9a4dbb620d010f1',
      clientSecret: 'v7G6ulMDemoXymQ3yT6vISJ7vHLh3Xs6',
      redirectUri: 'http://localhost:4200/auth/kakao/callback',
    });

    this.naverOAuth = new NaverOAuth({
      clientId: 'RPopRk4za0UNUkGXxu6n',
      clientSecret: 'b3ensHmVjQ',
      redirectUri: 'http://localhost:4200/auth/naver/callback',
    });
  }

  ngOnInit() {
    // 로그인 페이지 처리
    // this.login();
    const kakaoAuthUri = this.kakaoOAuth.getAuthRequestUri(); // print https://kauth.kakao.com/oauth/authorize?
    console.log('kakao authUri : ', kakaoAuthUri);

    const naverAuthUri = this.naverOAuth.getAuthRequestUri(); // print https://kauth.kakao.com/oauth/authorize?
    console.log('naver authUri : ', naverAuthUri);
  }

  private login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          log.debug(`${credentials.username} successfully logged in`);
          this.router.navigate([this.route.snapshot.queryParams['redirect'] || '/'], { replaceUrl: true });
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log('submit', this.loginForm.value);
      this.login();
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  kakaoLogin(): void {
    /*
    setTimeout(() => {
      this.isLoadingOne = false;
    }, 5000);
    */
  }

  naverLogin(): void {}
}
