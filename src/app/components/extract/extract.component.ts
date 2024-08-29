import { Component } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { Transaction } from 'src/app/interfaces/transaction';
import { ClientProvider } from 'src/app/services/providers/client.provider';
import { TransactionsProvider } from 'src/app/services/providers/transactions.provider';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss'],
})
export class ExtractComponent {
  constructor(
    private clientProvider: ClientProvider,
    private transactionsProvider: TransactionsProvider
  ) {}
  ngOnInit(): void {
    this.getClients();
  }

  selectedClient: Client | any;
  clients: Client[] | any;
  extract: Transaction[] | any;

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
    let account = { accountNumber: client.accountNumber };
    this.selectedClient = client;
    this.transactionsProvider.get(account).subscribe(
      (res: any) => {
        this.extract = res.sort((a: any, b: any) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        console.log(res);
      },
      (err: any) => {
        //TODO criar e chamar modal para erro de request
      }
    );
  }
}
