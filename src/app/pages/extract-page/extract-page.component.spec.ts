import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractPage } from './extract-page.component';

describe('ExtractPage', () => {
  let component: ExtractPage;
  let fixture: ComponentFixture<ExtractPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtractPage],
    });
    fixture = TestBed.createComponent(ExtractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
