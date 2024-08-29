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
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent {
  constructor(
    private formBuilder: FormBuilder,
    private clientProvider: ClientProvider,
    private accountProvider: AccountProvider,
    private transactionProvider: TransactionsProvider
  ) {}
  ngOnInit(): void {
    this.getUsers();
  }
  protected clients: Client[] = [];
  selectedClient: Client | any;
  account: Account | any;

  depositForm = this.formBuilder.group({
    accountNumber: ['', [Validators.required]],
    amount: ['', [Validators.required]],
  });

  getUsers() {
    this.clientProvider.get().subscribe(
      (res: any) => (this.clients = res),
      (err: any) => console.error(err)
    );
  }
  selectClient(client: Client) {
    this.selectedClient = client;
    this.depositForm.patchValue({
      accountNumber: client.accountNumber.toString(),
    });
  }
  submit() {
    try {
      this.depositAmount();
    } catch (error) {}
    //TODO fazer tratamento de erro
    console.log(this.depositForm.value);
  }

  depositAmount() {
    try {
      let accountNum = { accountNumber: this.selectedClient.accountNumber };

      this.accountProvider.get(accountNum).subscribe(
        (res: any) => {
          this.account = res[0];
          this.sendAmountTochange(this.account);
        },
        (err: any) => {
          //TODO tratativa de erro
        }
      );
    } catch (error) {}
  }

  sendAmountTochange(account: Account) {
    if (typeof this.depositForm.value.amount === 'string') {
      account.amount =
        account.amount == undefined
          ? 0 + parseFloat(this.depositForm.value.amount)
          : account.amount + parseFloat(this.depositForm.value.amount);
    }

    this.accountProvider.put(account, account.id).subscribe(
      (res: any) => {
        this.completeTransaction(account);
      },
      (err: any) => {
        //TODO tratativa de erro
      }
    );
  }

  completeTransaction(account: Account) {
    let transaction: Transaction = {
      accountNumber: account.accountNumber,
      amount: account.amount,
      date: new Date(),
      operation: 'Add',
      id: uuid(),
    };
    this.transactionProvider.post(transaction).subscribe(
      (res: any) => {
        this.selectedClient = undefined;
        this.depositForm.reset();
      },
      (err: any) => {}
    );
  }
}
