import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, retry, timeout } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GenericRequestService<T> {
  URI = environment.apiURI;

  constructor(private path: String = '', private http: HttpClient) {}

  protected getGeneric(id?: string, params?: any): Observable<T> {
    let url = id ? `${this.URI}${this.path}/${id}` : `${this.URI}${this.path}`;
    return !params ? this.http.get<T>(url) : this.http.get<T>(url, { params });
  }

  protected postGeneric(body: any = {}, id?: string): Observable<T> {
    let url = id ? `${this.URI}${this.path}/${id}` : `${this.URI}${this.path}`;
    return this.http.post<T>(url, body);
  }

  protected putGeneric(body: any = {}, id?: string): Observable<T> {
    let url = id ? `${this.URI}${this.path}/${id}` : `${this.URI}${this.path}`;
    return this.http.put<T>(url, body);
  }

  get(params?: any, id?: string) {
    return Observable.create((observer: any) => {
      this.getGeneric(id, params).subscribe(
        (res) => {
          observer.next(res);
        },
        (err) => {
          observer.next(err);
        }
      );
    }).pipe(retry(2), timeout(120000));
  }

  post(body: any, id?: string) {
    return Observable.create((observer: any) => {
      this.postGeneric(body, id).subscribe(
        (res) => {
          observer.next(res);
        },
        (err) => {
          observer.next(err);
        }
      );
    }).pipe(retry(2), timeout(120000));
  }

  put(body: any, id?: string) {
    return Observable.create((observer: any) => {
      this.putGeneric(body, id).subscribe(
        (res) => {
          observer.next(res);
        },
        (err) => {
          observer.next(err);
        }
      );
    }).pipe(retry(2), timeout(120000));
  }
}
