import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { LoginProvider } from 'src/app/services/providers/login.provider';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private popupService: PopupService,
    private loginProvider: LoginProvider,
    private router: Router
  ) {}
  loginForm = this.formBuilder.group({
    appUser: ['', [Validators.required, Validators.minLength(2)]],
    appPassword: ['', [Validators.required]],
  });

  submit() {
    if (this.loginForm.valid) {
      let user = {
        appUser: this.loginForm.value.appUser,
        appPassword: this.loginForm.value.appPassword,
        id: uuid(),
      };
      this.loginProvider.get(user).subscribe(
        (res: any) => {
          if (res.status && res.status != 200) {
            this.popupService.showMessage('Login Error', false);
          } else if (res.message == 'Login successful') {
            localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['']);
            this.popupService.showMessage('Login successfully!', true);
          } else {
            this.popupService.showMessage('Login Error', false);
          }
        },
        (err: any) => {
          this.popupService.showMessage('Login Error', false);
        }
      );
    } else {
      this.popupService.showMessage(this.generateErrorMessage(), false);
    }
  }

  generateErrorMessage(): string {
    if (this.loginForm.controls['appUser'].errors) {
      return 'User is required.';
    }

    if (this.loginForm.controls['appPassword'].errors) {
      return 'Password is required.';
    }
    return '';
  }
}
