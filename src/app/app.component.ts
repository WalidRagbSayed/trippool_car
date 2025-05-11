import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHeader = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const protectedRoutes = ['/dashboard', '/trips', '/drivers', '/payments', '/analytics'];
      this.showHeader = !protectedRoutes.some(route => event.urlAfterRedirects.startsWith(route));
    });
  }
}