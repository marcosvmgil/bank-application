import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPage } from './transfer-page.component';

describe('TransferPage', () => {
  let component: TransferPage;
  let fixture: ComponentFixture<TransferPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferPage],
    });
    fixture = TestBed.createComponent(TransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
