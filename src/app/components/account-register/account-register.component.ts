import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountProvider } from '../../services/providers/account.provider';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-account-register',
  templateUrl: './account-register.component.html',
  styleUrls: ['./account-register.component.scss'],
})
export class AccountRegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private accountProvider: AccountProvider
  ) {}

  //TODO fazer validação do form no html
  ngOnInit(): void {
    // this.getUsers();
  }

  checkoutForm = this.formBuilder.group({
    accountNumber: ['', [Validators.required]],
    clientName: ['', [Validators.required, Validators.minLength(2)]],
    documentNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    clientAddress: ['', [Validators.required]],
  });

  submmit() {
    if (this.checkoutForm.valid) {
      let body = {
        accountNumber: this.checkoutForm.value.accountNumber,
        clientName: this.checkoutForm.value.clientName,
        documentNumber: this.checkoutForm.value.documentNumber,
        clientAddress: this.checkoutForm.value.clientAddress,
        id: uuid(),
      };

      this.accountProvider.post(body).subscribe(
        (res: any) => {
          this.checkoutForm.reset();
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
  // getUsers() {
  //   this.accountProvider.get().subscribe(
  //     (res: any) => console.log(res),
  //     (err: any) => console.error(err)
  //   );
  // }

  generateErrorMessage(): string {
    const errors = [];

    if (this.checkoutForm.controls['accountNumber'].errors) {
      errors.push('Account Number is required.');
    }

    if (this.checkoutForm.controls['clientName'].errors) {
      errors.push('Client Name is required.');
    }

    if (this.checkoutForm.controls['documentNumber'].errors) {
      errors.push('Document Number is required.');
    }

    if (this.checkoutForm.controls['clientAddress'].errors) {
      errors.push('Client Address is required.');
    }

    return errors.join(' ');
  }
}
