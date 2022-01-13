import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit {
  category: Category;
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.categoryService
          .getCategoryById(+params.get('id'))
          .subscribe((res) => {
            this.category = res;
          });
      } else {
        router.navigate(['categories']);
      }
    });
  }

  ngOnInit(): void {}
}
