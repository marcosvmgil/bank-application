import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  message: string | null = null;
  isSuccess: boolean = true;

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    this.popupService.message.subscribe((message) => {
      this.message = message;
      this.isSuccess = this.popupService.isSuccess;
    });
  }
}
