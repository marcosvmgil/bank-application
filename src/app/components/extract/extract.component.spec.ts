import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ExtractComponent } from './extract.component';
import { ClientProvider } from 'src/app/services/providers/client.provider';
import { ExtractProvider } from 'src/app/services/providers/extract.provider';
import { PopupService } from 'src/app/services/popup.service';
import { Client } from 'src/app/interfaces/client';

describe('ExtractComponent', () => {
  let component: ExtractComponent;
  let fixture: ComponentFixture<ExtractComponent>;
  let clientProviderMock: any;
  let extractProviderMock: any;
  let popupServiceMock: any;

  beforeEach(() => {
    clientProviderMock = jasmine.createSpyObj('ClientProvider', ['get']);
    extractProviderMock = jasmine.createSpyObj('ExtractProvider', ['get']);
    popupServiceMock = jasmine.createSpyObj('PopupService', ['showMessage']);

    TestBed.configureTestingModule({
      declarations: [ExtractComponent],
      providers: [
        { provide: ClientProvider, useValue: clientProviderMock },
        { provide: ExtractProvider, useValue: extractProviderMock },
        { provide: PopupService, useValue: popupServiceMock },
      ],
    });

    fixture = TestBed.createComponent(ExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve clients on init', () => {
    const mockClients: Client[] = [
      {
        id: 'b3a81f55-ab8a-4ae4-92db-19cd56df238e',
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
