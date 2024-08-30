import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRegisterComponent } from './account-register/account-register.component';
import { TransferComponent } from './transfer/transfer.component';
import { DepositComponent } from './deposit/deposit.component';
import { HeaderComponent } from './header/header.component';
import { ExtractComponent } from './extract/extract.component';
import { PopupComponent } from './popup/popup.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HeaderComponent,
    AccountRegisterComponent,
    TransferComponent,
    DepositComponent,
    ExtractComponent,
    PopupComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    HeaderComponent,
    AccountRegisterComponent,
    TransferComponent,
    DepositComponent,
    ExtractComponent,
    PopupComponent,
  ],
})
export class ComponentsModule {}
