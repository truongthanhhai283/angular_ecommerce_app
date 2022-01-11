import { Component, OnInit } from '@angular/core';
import { Category } from './models/category';
import { AuthService } from './services/auth/auth.service';
import { CategoryService } from './services/category/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Ecommerce App';
  categories: Category[];
  /**
   *
   */
  constructor(
    public authService: AuthService,
    private categoryService: CategoryService
  ) {
    authService.prepareUserData();
    this.prepareCategory();
  }

  prepareCategory() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  ngOnInit(): void {
    this.authService.prepareUserData();
    this.prepareCategory();
  }
}
