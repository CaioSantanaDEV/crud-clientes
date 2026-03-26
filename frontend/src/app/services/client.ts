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
}