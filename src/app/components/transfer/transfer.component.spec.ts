import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { TransferComponent } from './transfer.component';
import { AccountProvider } from 'src/app/services/providers/account.provider';
import { ClientProvider } from 'src/app/services/providers/client.provider';
import { ExtractProvider } from 'src/app/services/providers/extract.provider';
import { TransferProvider } from 'src/app/services/providers/transfer.provider';
import { PopupService } from 'src/app/services/popup.service';
import { Client } from 'src/app/interfaces/client';
import { Account } from 'src/app/interfaces/account';
import { Transaction } from 'src/app/interfaces/transaction';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;
  let clientProviderMock: any;
  let accountProviderMock: any;
  let extractProviderMock: any;
  let transferProviderMock: any;
  let popupServiceMock: any;

  beforeEach(() => {
    clientProviderMock = jasmine.createSpyObj('ClientProvider', ['get']);
    accountProviderMock = jasmine.createSpyObj('AccountProvider', [
      'get',
      'put',
    ]);
    extractProviderMock = jasmine.createSpyObj('ExtractProvider', ['post']);
    transferProviderMock = jasmine.createSpyObj('TransferProvider', ['post']);
    popupServiceMock = jasmine.createSpyObj('PopupService', ['showMessage']);

    TestBed.configureTestingModule({
      declarations: [TransferComponent],
      providers: [
        FormBuilder,
        { provide: ClientProvider, useValue: clientProviderMock },
        { provide: AccountProvider, useValue: accountProviderMock },
        { provide: ExtractProvider, useValue: extractProviderMock },
        { provide: TransferProvider, useValue: transferProviderMock },
        { provide: PopupService, useValue: popupServiceMock },
      ],
    });

    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve clients on init', () => {
    const mockClients: Client[] = [
      {
        id: '1',
        clientName: 'John Doe',
        accountNumber: 12345,
        clientAddress: 'Rua dos bobos, 8',
        documentNumber: 99999,
      },
    ];
    clientProviderMock.get.and.returnValue(of(mockClients));

    component.ngOnInit();
    fixture.detectChanges();

    expect(clientProviderMock.get).toHaveBeenCalled();
    expect(component.clients).toEqual(mockClients);
  });
});
