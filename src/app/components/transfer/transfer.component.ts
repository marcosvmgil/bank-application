import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Account } from 'src/app/interfaces/account';
import { Client } from 'src/app/interfaces/client';
import { Transaction } from 'src/app/interfaces/transaction';
import { AccountProvider } from 'src/app/services/providers/account.provider';
import { ClientProvider } from 'src/app/services/providers/client.provider';
import { TransactionsProvider } from 'src/app/services/providers/transactions.provider';
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
    private transactionProvider: TransactionsProvider
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  protected clients: Client[] = [];

  transferForm = this.formBuilder.group({
    accountNumberDebit: ['', [Validators.required]],
    accountNumberCredit: ['', [Validators.required]],
    amount: ['', [Validators.required]],
  });

  getClients() {
    this.clientProvider.get().subscribe(
      (res: any) => (this.clients = res),
      (err: any) => console.error(err)
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
    console.log(this.transferForm.value);
    this.transferAmount();
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
          //TODO tratativa de erro
        }
      );
      this.accountProvider.get(idDebit).subscribe(
        (res: any) => {
          this.debitAccount = res[0];
          this.sendAmoutToChange(this.debitAccount, 'Remove');
        },
        (err: any) => {
          //TODO tratativa de erro
        }
      );
    } catch (error) {}
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
        this.completeTransaction(account, operation);
      },
      (err: any) => {
        //TODO tratativa de erro
      }
    );
  }
  completeTransaction(account: Account, type: string) {
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
    this.transactionProvider.post(transaction).subscribe(
      (res: any) => {
        this.selectedCreditClient = undefined;
        this.selectedDebitClient = undefined;
        this.transferForm.reset();
      },
      (err: any) => {}
    );

    //TODO enviar os dados para o log de tansferencias
  }
}
