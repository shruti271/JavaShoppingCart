import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
 // authService = inject(AuthService);
  isLoggedIn = false;
  ngOnInit() {
    //this.isLoggedIn = this.authService.slog();
    // this.authService.isLoggedIn$.subscribe((res) => (this.isLoggedIn = res));
  }
}
