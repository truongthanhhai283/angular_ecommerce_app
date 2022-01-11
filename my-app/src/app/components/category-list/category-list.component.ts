import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  @Input() inputCategories: Category[];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    if (this.route.snapshot.data.categories) {
      this.categories = this.route.snapshot.data.categories;
    }
  }

  ngOnInit(): void {}
}
