import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRegisterPage } from './pages/account-register-page/account-register-page.component';
import { TransferPage } from './pages/transfer-page/transfer-page.component';
import { DepositPage } from './pages/deposit-page/deposit-page.component';
import { ExtractPage } from './pages/extract-page/extract-page.component';
import { LoginPage } from './pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ExtractPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'transfer',
    component: TransferPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'deposit',
    component: DepositPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: AccountRegisterPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
