import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:3000/employees';

  constructor(private readonly _http: HttpClient) {}

  getAllEmployees(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  addEmployee(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    // Ensure data is properly formatted as JSON
    return this._http.put(`${this.apiUrl}/${id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
