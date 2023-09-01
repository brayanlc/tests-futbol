import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { ParamsType } from '../models/api-base-actions';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = environment.apiUrl;
  constructor(public httpClient: HttpClient) {}

  Get<T>(url: string, params?: ParamsType): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl + url}`, {
      params: this.createParams(params),
    });
  }

  GetAll<T>(url: string, params?: ParamsType): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl + url}`, {
      params: this.createParams(params),
    });
  }

  Post<T>(url: string, data: any, params?: ParamsType): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl + url}`, data, {
      params: this.createParams(params),
    });
  }

  Delete<T>(url: string, data: any, params?: ParamsType): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiUrl + url}`, {
      params: this.createParams(params),
    });
  }

  Put<T>(url: string, data: any, params?: ParamsType): Observable<T> {
    return this.httpClient.put<T>(`${this.apiUrl + url}`, data, {
      params: this.createParams(params),
    });
  }

  createParams(params?: ParamsType) {
    return new HttpParams({ fromObject: params });
  }
}
