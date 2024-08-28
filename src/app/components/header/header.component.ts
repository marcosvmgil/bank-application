import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  protected routes = [
    {
      path: '',
      page: 'Cadastro',
    },
    {
      path: 'transfer',
      page: 'Transferencias',
    },

    {
      path: 'deposit',
      page: 'Depósito',
    },

    {
      path: 'extract',
      page: 'Consulta Extrato',
    },
  ];

  navToRoute(route: string) {
    this.router.navigate([route]);
  }

  currentRoute(path: string) {
    return this.router.url == `/${path}`;
  }
}
