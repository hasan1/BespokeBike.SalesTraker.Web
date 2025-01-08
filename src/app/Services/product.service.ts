import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductCreateDto, ProductUpdateDto } from '../Model/Product';
import { ApiResponse } from '../Model/ApiResponse';
import { environment } from '../../emvironments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly apiUrl = `${environment.apiUrl}/Product`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  addProduct(product: ProductCreateDto): Observable<Product> {
    return this.http.post<ApiResponse<Product>>(this.apiUrl, product).pipe(
      map(response => response.data)
    );
  }

  updateProduct(product: ProductUpdateDto): Observable<Product> {
    return this.http.put<ApiResponse<Product>>(`${this.apiUrl}/${product.productId}`, product).pipe(
      map(response => response.data)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }


  isProductNameUnique(productName: string, productId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('productName', productName)
      .set('productId', productId.toString());

    return this.http.get<ApiResponse<boolean>>(`${this.apiUrl}/IsProductNameUnique`, { params }).pipe(
      map(response => response.data)
    );
  }
}
