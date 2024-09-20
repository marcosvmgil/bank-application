import { Component } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { Transaction } from 'src/app/interfaces/transaction';
import { PopupService } from 'src/app/services/popup.service';
import { ClientProvider } from 'src/app/services/providers/client.provider';
import { ExtractProvider } from 'src/app/services/providers/extract.provider';

@Component({
  selector: 'app-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss'],
})
export class ExtractComponent {
  constructor(
    private clientProvider: ClientProvider,
    private extractProvider: ExtractProvider,
    private popupService: PopupService
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
        this.popupService.showMessage('Error retrieving clients.', false);
      }
    );
  }

  selectClient(client: Client) {
    let account = { accountNumber: client.accountNumber };
    this.selectedClient = client;
    this.extractProvider.get(account).subscribe(
      (res: any) => {
        if (res.status == 404) {
          this.extract = [];
        } else {
          this.extract = res.sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        }
      },
      (err: any) => {
        this.popupService.showMessage('Error retrieving extract.', false);
      }
    );
  }
}
