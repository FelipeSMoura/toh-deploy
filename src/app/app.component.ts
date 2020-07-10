import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  navItems:{caminho: string; texto: string}[] = [
    { caminho: '/dashboard', texto: 'Dashboard'},
    { caminho: '/heroes', texto: 'Heroes'},
  ];
  constructor() {
    const token = localStorage.getItem('token');
    if (!token) {
      const randomToken = Math.random().toString(36).substring(-10);
      localStorage.setItem('token', randomToken);
    }
  }

}
