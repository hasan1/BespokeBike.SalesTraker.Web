// filepath: /c:/Users/bsata/source/repos/BespokeBike.SalesTraker.Web/src/app/Services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee, EmployeeCreateDto, EmployeeUpdateDto } from '../Model/Employee';
import { ApiResponse } from '../Model/ApiResponse';
import { environment } from '../../emvironments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly apiUrl = `${environment.apiUrl}/Employee`;

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<ApiResponse<Employee[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<ApiResponse<Employee>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  addEmployee(employee: EmployeeCreateDto): Observable<Employee> {
    return this.http.post<ApiResponse<Employee>>(this.apiUrl, employee).pipe(
      map(response => response.data)
    );
  }

  updateEmployee(employee: EmployeeUpdateDto): Observable<Employee> {
    return this.http.put<ApiResponse<Employee>>(`${this.apiUrl}/${employee.employeeId}`, employee).pipe(
      map(response => response.data)
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
