import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Ecommerce App';

  /**
   *
   */
  constructor(public authService: AuthService) {
    authService.prepareUserData();
  }
  ngOnInit(): void {
    this.authService.prepareUserData();
  }
}
