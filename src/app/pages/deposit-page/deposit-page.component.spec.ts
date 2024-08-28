import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPage } from './deposit-page.component';

describe('DepositPage', () => {
  let component: DepositPage;
  let fixture: ComponentFixture<DepositPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositPage],
    });
    fixture = TestBed.createComponent(DepositPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
