import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { DepositComponent } from './deposit.component';
import { AccountProvider } from 'src/app/services/providers/account.provider';
import { ClientProvider } from 'src/app/services/providers/client.provider';
import { DepositProvider } from 'src/app/services/providers/deposit.provider';
import { ExtractProvider } from 'src/app/services/providers/extract.provider';
import { PopupService } from 'src/app/services/popup.service';
import { Client } from 'src/app/interfaces/client';

describe('DepositComponent', () => {
  let component: DepositComponent;
  let fixture: ComponentFixture<DepositComponent>;
  let clientProviderMock: any;
  let accountProviderMock: any;
  let depositProviderMock: any;
  let extractProviderMock: any;
  let popupServiceMock: any;

  beforeEach(() => {
    clientProviderMock = jasmine.createSpyObj('ClientProvider', ['get']);
    accountProviderMock = jasmine.createSpyObj('AccountProvider', [
      'get',
      'put',
    ]);
    depositProviderMock = jasmine.createSpyObj('DepositProvider', ['post']);
    extractProviderMock = jasmine.createSpyObj('ExtractProvider', ['post']);
    popupServiceMock = jasmine.createSpyObj('PopupService', ['showMessage']);

    TestBed.configureTestingModule({
      declarations: [DepositComponent],
      providers: [
        { provide: ClientProvider, useValue: clientProviderMock },
        { provide: AccountProvider, useValue: accountProviderMock },
        { provide: DepositProvider, useValue: depositProviderMock },
        { provide: ExtractProvider, useValue: extractProviderMock },
        { provide: PopupService, useValue: popupServiceMock },
        FormBuilder,
      ],
      imports: [ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(DepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve clients on init', () => {
    const mockClients: Client[] = [
      {
        id: 'c9063d9d-1518-43c9-b007-7bc81ad9d31d',
        clientName: 'Willian Silva',
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
