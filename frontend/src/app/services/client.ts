import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly API = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  findById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.API}/${id}`);
  }

  update(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.API}/${id}`, client);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}