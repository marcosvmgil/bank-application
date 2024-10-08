import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Account } from 'src/app/interfaces/account';
import { Client } from 'src/app/interfaces/client';
import { Transaction } from 'src/app/interfaces/transaction';
import { PopupService } from 'src/app/services/popup.service';
import { AccountProvider } from 'src/app/services/providers/account.provider';
import { ClientProvider } from 'src/app/services/providers/client.provider';
import { ExtractProvider } from 'src/app/services/providers/extract.provider';
import { TransferProvider } from 'src/app/services/providers/transfer.provider';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent {
  selectedCreditClient: Client | any;
  selectedDebitClient: Client | any;
  debitAccount: Account | any;
  creditAccount: Account | any;
  constructor(
    private formBuilder: FormBuilder,
    private clientProvider: ClientProvider,
    private accountProvider: AccountProvider,
    private extractProvider: ExtractProvider,
    private transferProvider: TransferProvider,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  clients: Client[] = [];

  transferForm = this.formBuilder.group({
    accountNumberDebit: ['', [Validators.required]],
    accountNumberCredit: ['', [Validators.required]],
    amount: ['', [Validators.required]],
  });

  getClients() {
    this.clientProvider.get().subscribe(
      (res: any) => (this.clients = res),
      (err: any) => {
        this.popupService.showMessage('Error retrieving clients.', false);
      }
    );
  }

  selectCreditClient(client: Client) {
    this.selectedCreditClient = client;
    this.transferForm.patchValue({
      accountNumberCredit: client.accountNumber.toString(),
    });
  }
  selectDebitClient(client: Client) {
    this.selectedDebitClient = client;
    this.transferForm.patchValue({
      accountNumberDebit: client.accountNumber.toString(),
    });
  }

  submit() {
    if (this.transferForm.valid) {
      if (
        this.transferForm.value.accountNumberCredit ==
        this.transferForm.value.accountNumberDebit
      ) {
        this.popupService.showMessage(
          'You cannot withdraw and send to the same person.',
          false
        );
      } else {
        this.transferAmount();
      }
    } else {
      this.popupService.showMessage(this.generateErrorMessage(), false);
    }
  }

  transferAmount() {
    try {
      let idCredit = { accountNumber: this.selectedCreditClient.accountNumber };
      let idDebit = { accountNumber: this.selectedDebitClient.accountNumber };

      this.accountProvider.get(idCredit).subscribe(
        (res: any) => {
          this.creditAccount = res[0];
          this.sendAmoutToChange(this.creditAccount, 'Add');
        },
        (err: any) => {
          throw new Error('Error fetching credit account: ' + err.message);
        }
      );
      this.accountProvider.get(idDebit).subscribe(
        (res: any) => {
          this.debitAccount = res[0];
          this.sendAmoutToChange(this.debitAccount, 'Remove');
        },
        (err: any) => {
          throw new Error('Error fetching debit account: ' + err.message);
        }
      );
    } catch (error) {
      this.popupService.showMessage('Error performing transfer.', false);
    }
  }

  sendAmoutToChange(account: Account, operation: string) {
    if (typeof this.transferForm.value.amount === 'string') {
      if (operation === 'Add') {
        account.amount =
          account.amount == undefined
            ? 0 + parseFloat(this.transferForm.value.amount)
            : account.amount + parseFloat(this.transferForm.value.amount);
      } else {
        account.amount =
          account.amount == undefined
            ? 0 - parseFloat(this.transferForm.value.amount)
            : account.amount - parseFloat(this.transferForm.value.amount);
      }
    }

    this.accountProvider.put(account, account.id).subscribe(
      (res: any) => {
        this.completeTransfer(account, operation);
      },
      (err: any) => {
        throw new Error('Error updating account: ' + err.message);
      }
    );
  }

  completeTransaction(transaction: Transaction) {
    this.extractProvider.post(transaction).subscribe(
      (res: any) => {
        this.selectedCreditClient = undefined;
        this.selectedDebitClient = undefined;
        this.transferForm.reset();
        this.popupService.showMessage('Transfer completed successfully!', true);
      },
      (err: any) => {
        throw new Error('Error completing transaction: ' + err.message);
      }
    );
  }

  completeTransfer(account: Account, type: string) {
    let transaction: Transaction = {
      accountNumber: account.accountNumber,
      amountTotal: account.amount,
      amountOperation:
        typeof this.transferForm.value.amount === 'string'
          ? parseFloat(this.transferForm.value.amount)
          : 0,
      date: new Date(),
      operation: type,
      id: uuid(),
    };
    this.transferProvider.post(transaction).subscribe(
      (res: any) => {
        this.completeTransaction(transaction);
      },
      (err: any) => {
        throw new Error('Error completing transaction: ' + err.message);
      }
    );
  }

  generateErrorMessage(): string {
    if (this.transferForm.controls['accountNumberDebit'].errors) {
      return 'Account Number removing is required.';
    }

    if (this.transferForm.controls['accountNumberCredit'].errors) {
      return 'Account Number adding is required.';
    }

    if (this.transferForm.controls['amount'].errors) {
      return 'Amount is required.';
    }

    return '';
  }
}
