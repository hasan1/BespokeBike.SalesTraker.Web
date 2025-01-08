// filepath: /c:/Users/bsata/source/repos/BespokeBike.SalesTraker.Web/src/app/Services/sale.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sale, SaleCreateDto, SaleUpdateDto } from '../Model/Sale';
import { ApiResponse } from '../Model/ApiResponse';
import { environment } from '../../emvironments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private readonly apiUrl = `${environment.apiUrl}/Sale`;

  constructor(private http: HttpClient) {}

  getSales(): Observable<Sale[]> {
    return this.http.get<ApiResponse<Sale[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getSale(id: number): Observable<Sale> {
    return this.http.get<ApiResponse<Sale>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  addSale(sale: SaleCreateDto): Observable<Sale> {
    return this.http.post<ApiResponse<Sale>>(this.apiUrl, sale).pipe(
      map(response => response.data)
    );
  }

  updateSale(sale: SaleUpdateDto): Observable<Sale> {
    return this.http.put<ApiResponse<Sale>>(`${this.apiUrl}/${sale.saleId}`, sale).pipe(
      map(response => response.data)
    );
  }

  deleteSale(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
