import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRegisterComponent } from './account-register/account-register.component';
import { TransferComponent } from './transfer/transfer.component';
import { DepositComponent } from './deposit/deposit.component';
import { HeaderComponent } from './header/header.component';
import { ExtractComponent } from './extract/extract.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AccountRegisterComponent,
    TransferComponent,
    DepositComponent,
    ExtractComponent,
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent,
    AccountRegisterComponent,
    TransferComponent,
    DepositComponent,
    ExtractComponent,
  ],
})
export class ComponentsModule {}
