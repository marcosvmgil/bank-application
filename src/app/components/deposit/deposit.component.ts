import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Account } from 'src/app/interfaces/account';
import { Client } from 'src/app/interfaces/client';
import { Transaction } from 'src/app/interfaces/transaction';
import { AccountProvider } from 'src/app/services/providers/account.provider';
import { ClientProvider } from 'src/app/services/providers/client.provider';
import { DepositProvider } from 'src/app/services/providers/deposit.provider';
import { ExtractProvider } from 'src/app/services/providers/extract.provider';
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
    private extractProvider: ExtractProvider,
    private depositProvider: DepositProvider
  ) {}
  ngOnInit(): void {
    this.getClients();
  }
  protected clients: Client[] = [];
  selectedClient: Client | any;
  account: Account | any;

  depositForm = this.formBuilder.group({
    accountNumber: ['', [Validators.required]],
    amount: ['', [Validators.required]],
  });

  getClients() {
    this.clientProvider.get().subscribe(
      (res: any) => (this.clients = res),
      (err: any) => {
        //TODO criar e chamar modal para erro de request
        console.error(err);
      }
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
    } catch (error) {
      //TODO criar e chamar modal para erro de request
    }

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
          throw new Error('Error fetching account: ' + err.message);
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
        this.completeDeposit(account);
      },
      (err: any) => {
        throw new Error('Error updating account: ' + err.message);
      }
    );
  }

  completeTransaction(transaction: Transaction) {
    // depositProvider;
    this.extractProvider.post(transaction).subscribe(
      (res: any) => {
        this.selectedClient = undefined;
        this.depositForm.reset();
      },
      (err: any) => {
        throw new Error('Error completing transaction: ' + err.message);
      }
    );
  }

  completeDeposit(account: Account) {
    let transaction: Transaction = {
      accountNumber: account.accountNumber,
      amountTotal: account.amount,
      amountOperation:
        typeof this.depositForm.value.amount === 'string'
          ? parseFloat(this.depositForm.value.amount)
          : 0,
      date: new Date(),
      operation: 'Add',
      id: uuid(),
    };
    this.depositProvider.post(transaction).subscribe(
      (res: any) => {
        this.completeTransaction(transaction);
      },
      (err: any) => {
        throw new Error('Error completing transaction: ' + err.message);
      }
    );
  }
}
