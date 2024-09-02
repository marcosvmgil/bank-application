import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { AccountRegisterComponent } from './account-register.component';
import { ClientProvider } from '../../services/providers/client.provider';
import { AccountProvider } from '../../services/providers/account.provider';
import { PopupService } from 'src/app/services/popup.service';

describe('AccountRegisterComponent', () => {
  let component: AccountRegisterComponent;
  let fixture: ComponentFixture<AccountRegisterComponent>;
  let clientProviderMock: any;
  let accountProviderMock: any;
  let popupServiceMock: any;

  beforeEach(() => {
    accountProviderMock = jasmine.createSpyObj('AccountProvider', ['post']);
    clientProviderMock = jasmine.createSpyObj('ClientProvider', ['post']);
    popupServiceMock = jasmine.createSpyObj('PopupService', ['showMessage']);

    TestBed.configureTestingModule({
      declarations: [AccountRegisterComponent],
      providers: [
        { provide: AccountProvider, useValue: accountProviderMock },
        { provide: ClientProvider, useValue: clientProviderMock },
        { provide: PopupService, useValue: popupServiceMock },
        FormBuilder,
      ],
    });

    fixture = TestBed.createComponent(AccountRegisterComponent);
    component = fixture.componentInstance;
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show success message on successful client creation', () => {
    component.clientForm.controls['accountNumber'].setValue('123456');
    component.clientForm.controls['clientName'].setValue('Wiliian Silva');
    component.clientForm.controls['documentNumber'].setValue('123456789');
    component.clientForm.controls['clientAddress'].setValue('Rua dos bobos, 9');

    const mockClient = { accountNumber: '123456' };

    clientProviderMock.post.and.returnValue(of(mockClient));
    accountProviderMock.post.and.returnValue(of({}));

    component.submit();

    expect(popupServiceMock.showMessage).toHaveBeenCalledWith(
      'Client created successfully!',
      true
    );
  });
});
