import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private productService: ProductService
  ) {
    if (route.snapshot.data.products) {
      this.products = route.snapshot.data.products;
    }
  }

  ngOnInit(): void {}

  productDetails(product: Product) {
    this.router.navigate(['/products', product.id], {
      queryParams: {
        Name: product.name,
      },
    });
  }

  pushToCart(productId: number, quantity: number) {
    if (this.authService.cartItem) {
      this.productService.insertToCart(
        productId,
        this.authService.cartItem.id,
        quantity
      ).subscribe(res=>{
        
      });
    }
  }
}
