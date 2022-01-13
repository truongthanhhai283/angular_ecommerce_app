import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ErrorHandler } from 'src/app/shared/error-handler';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = `http://localhost:3000/products`;
  constructor(private http: HttpClient, private router: Router) {}
  private errorHandler: ErrorHandler = new ErrorHandler();

  getProducts(): Promise<Product[]> {
    try {
      return this.http.get<Product[]>(this.url).toPromise();
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getProductById(id: number): Observable<Product> {
    try {
      const urlByIdProduct = `${this.url}/${id}`;
      return this.http.get<Product>(urlByIdProduct);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  insertToCart(
    productId: number,
    cartItemId: number,
    cartQuantity: number
  ): Observable<Product> {
    try {
      const params = new HttpParams().set('quantity', cartQuantity.toString());
      const urlByIdProduct = `${this.url}/${productId}/addtocart/${cartItemId}`;
      return this.http.post<Product>(urlByIdProduct, null, {
        params,
      });
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  updateProductQuantity(
    productId: number,
    cartQuantity: number
  ): Observable<void> {
    try {
      const params = new HttpParams().set(
        'cartQuantity',
        cartQuantity.toString()
      );
      const urlByIdProduct = `${this.url}/${productId}/update-quantity`;
      return this.http.patch<void>(urlByIdProduct, null, {
        params,
      });
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  viewProductDetails(product: Product) {
    this.router.navigate(['/products', product.id], {
      queryParams: {
        Name: product.name,
      },
    });
  }
}
