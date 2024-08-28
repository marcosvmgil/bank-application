import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRegisterPage } from './pages/account-register-page/account-register-page.component';
import { TransferPage } from './pages/transfer-page/transfer-page.component';
import { DepositPage } from './pages/deposit-page/deposit-page.component';
import { ExtractPage } from './pages/extract-page/extract-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExtractPage,
  },
  {
    path: 'transfer',
    component: TransferPage,
  },
  {
    path: 'deposit',
    component: DepositPage,
  },
  {
    path: 'register',
    component: AccountRegisterPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
