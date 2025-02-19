import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, lastValueFrom, map } from 'rxjs';
import { RequestMethod } from '../../enums/httpRequest/requestMethods.enum';
import { environment } from '@/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalHttpService {
  constructor(public _http: HttpClient) {}
  public api = environment.url;

  /**
   * Performs a request to a given route with given payload and method (default to GET).
   * @param route the route to make the request to
   * @param payload the payload to send with the request
   * @param method the http request method (default to GET)
   * @returns a promise of the response
   */
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

  /**
   * Makes a http request with given options and method to the given route.
   * @param url the route to make the request to
   * @param options the options to send with the request
   * @param method the http request method (default to GET)
   * @returns a promise of the response
   */
  public async makeHttpRequest<T>(
    url: string,
    options: unknown = {},
    method: string = RequestMethod.GET
  ): Promise<T> {
    const requestOptions: object =
      method === RequestMethod.GET ? {} : { body: options };
    return lastValueFrom(
      this._http
        .request<T>(method, url, requestOptions)
        .pipe(map((response) => response as T))
    );
  }
}
