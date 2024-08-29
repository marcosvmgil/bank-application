import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientProvider } from '../../services/providers/client.provider';
import { v4 as uuid } from 'uuid';
import { Client } from '../../interfaces/client';
import { AccountProvider } from '../../services/providers/account.provider';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.scss'],
})
export class AccountRegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private clientProvider: ClientProvider,
    private accountProvider: AccountProvider
  ) {}

  //TODO fazer validação do form no html
  ngOnInit(): void {}

  clientForm = this.formBuilder.group({
    accountNumber: ['', [Validators.required]],
    clientName: ['', [Validators.required, Validators.minLength(2)]],
    documentNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    clientAddress: ['', [Validators.required]],
  });

  submit() {
    if (this.clientForm.valid) {
      let body = {
        accountNumber: this.clientForm.value.accountNumber,
        clientName: this.clientForm.value.clientName,
        documentNumber: this.clientForm.value.documentNumber,
        clientAddress: this.clientForm.value.clientAddress,
        id: uuid(),
      };

      this.clientProvider.post(body).subscribe(
        (res: any) => {
          this.createAccount(res);
          this.clientForm.reset();
        },
        (err: any) => {
          //TODO fazer tratativa de erro com modal
        }
      );
    } else {
      console.log(this.generateErrorMessage());

      //TODO fazer tratativa de erro com modal
    }
  }

  createAccount(client: Client) {
    let account = {
      accountNumber: client.accountNumber,
      amount: 0,
      id: uuid(),
    };
    this.accountProvider.post(account).subscribe(
      (res: any) => {},
      (er: any) => {}
    );
  }

  generateErrorMessage(): string {
    const errors = [];

    if (this.clientForm.controls['accountNumber'].errors) {
      errors.push('Account Number is required.');
    }

    if (this.clientForm.controls['clientName'].errors) {
      errors.push('Client Name is required.');
    }

    if (this.clientForm.controls['documentNumber'].errors) {
      errors.push('Document Number is required.');
    }

    if (this.clientForm.controls['clientAddress'].errors) {
      errors.push('Client Address is required.');
    }

    return errors.join(' ');
  }
}
