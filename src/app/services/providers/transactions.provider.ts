import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericRequestService } from '../generic-request.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsProvider extends GenericRequestService<any> {
  constructor(http: HttpClient) {
    super('transactions', http);
  }
}
