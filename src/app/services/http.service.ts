import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseURL = 'https://dummyjson.com';

  constructor(private http: HttpClient) { }

  // Example method to fetch todos
  public getTodos(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/todos`);
  }
}
