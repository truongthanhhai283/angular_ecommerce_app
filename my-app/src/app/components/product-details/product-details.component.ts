import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public productService: ProductService
  ) {
    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('productId')) {
        this.productService
          .getProductById(+params.get('productId'))
          .subscribe((resProduct) => {
            this.product = resProduct;
          });
      }
    });
  }

  ngOnInit(): void {}
}
