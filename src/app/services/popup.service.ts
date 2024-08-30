import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private messageSource = new BehaviorSubject<string | null>(null);
  public message = this.messageSource.asObservable();
  public isSuccess = true;

  showMessage(message: string, success: boolean) {
    this.messageSource.next(message);
    this.isSuccess = success;
    setTimeout(() => this.clearMessage(), 3000);
  }

  clearMessage() {
    this.messageSource.next(null);
  }
}
