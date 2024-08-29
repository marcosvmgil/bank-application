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
      page: 'Extract Query',
    },
    {
      path: 'transfer',
      page: 'Transfers',
    },

    {
      path: 'deposit',
      page: 'Deposits',
    },

    {
      path: 'register',
      page: 'Register',
    },
  ];

  navToRoute(route: string) {
    this.router.navigate([route]);
  }

  currentRoute(path: string) {
    return this.router.url == `/${path}`;
  }
}
