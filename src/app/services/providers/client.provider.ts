import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericRequestService } from '../generic-request.service';

@Injectable({
  providedIn: 'root',
})
export class ClientProvider extends GenericRequestService<any> {
  constructor(http: HttpClient) {
    super('client', http);
  }
}
