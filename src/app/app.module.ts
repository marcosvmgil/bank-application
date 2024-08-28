import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AccountRegisterPage } from './pages/account-register-page/account-register-page.component';
import { TransferPage } from './pages/transfer-page/transfer-page.component';
import { DepositPage } from './pages/deposit-page/deposit-page.component';
import { ExtractPage } from './pages/extract-page/extract-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountRegisterPage,
    TransferPage,
    DepositPage,
    ExtractPage,
  ],
  imports: [BrowserModule, AppRoutingModule, ComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
