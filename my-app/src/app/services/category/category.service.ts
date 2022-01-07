import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ErrorHandler } from 'src/app/shared/error-handler';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUrl = `http://localhost:3000/categories`;
  constructor(private http: HttpClient) {}
  private errorHandler: ErrorHandler = new ErrorHandler();

  getCategories(): Observable<Category[]> {
    try {
      return this.http.get<Category[]>(this.categoryUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getCategoryById(id: number): Observable<Category> {
    try {
      const urlOfCategory = `${this.categoryUrl}/${id}`;
      return this.http.get<Category>(urlOfCategory);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getCategoryProduct(id: number): Observable<Product[]> {
    try {
      return this.http.get<Product[]>(`${this.categoryUrl}/products`);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  createCategory(createCategoryDto: any): Observable<Category> {
    try {
      return this.http.post<Category>(this.categoryUrl, createCategoryDto);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  updateCategory(categoryId: number, updateCategoryDto: any): Observable<void> {
    try {
      const urlOfCategory = `${this.categoryUrl}/${categoryId}`;
      return this.http.put<void>(urlOfCategory, updateCategoryDto);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  updateProduct(
    categoryId: number,
    productId: number,
    updateProductDto: any
  ): Observable<void> {
    try {
      const urlProductOfCategory = `${this.categoryUrl}/${categoryId}/products/${productId}`;
      return this.http.put<void>(urlProductOfCategory, updateProductDto);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  deleteCategory(categoryId: number): Observable<any> {
    try {
      const urlOfCategory = `${this.categoryUrl}/${categoryId}`;
      return this.http.delete<void>(urlOfCategory);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  deleteProductOfCategory(
    categoryId: number,
    productId: number
  ): Observable<void> {
    try {
      const urlProductOfCategory = `${this.categoryUrl}/${categoryId}/products/${productId}`;
      return this.http.delete<void>(urlProductOfCategory);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  addProduct(categoryId: number, createProductDto: any): Observable<void> {
    try {
      const urlOfCategory = `${this.categoryUrl}/products`;
      return this.http.put<void>(urlOfCategory, createProductDto);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
