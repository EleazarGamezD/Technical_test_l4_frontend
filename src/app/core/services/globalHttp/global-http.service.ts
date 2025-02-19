import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, lastValueFrom, map } from 'rxjs';
import { RequestMethod } from '../../enums/httpRequest/requestMethods.enum';

@Injectable({
  providedIn: 'root',
})
export class GlobalHttpService {
  constructor(public _http: HttpClient) {}

  public async makeRequest<T, P>(
    route: string,
    payload: P,
    method: string = RequestMethod.GET
  ): Promise<T> {
    return lastValueFrom(
      from(this.makeHttpRequest<T>(route, payload, method)).pipe(
        map((res) => res),
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);
          throw error;
        })
      )
    );
  }

  public async makeHttpRequest<T>(
    url: string,
    options: unknown = {},
    method: string = RequestMethod.GET
  ): Promise<T> {
    const requestOptions: object =
      method === RequestMethod.GET ? { body: options } : {};
    return lastValueFrom(
      this._http
        .request<T>(method, url, requestOptions)
        .pipe(map((response) => response as T))
    );
  }
}
