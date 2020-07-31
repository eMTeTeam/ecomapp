import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { CommonapiService } from '../../app/service/commonapi.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private apiService: CommonapiService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // HttpHeader object immutable - copy values
    const headerSettings: { [name: string]: string | string[]; } = {};

    headerSettings['Authorization'] = "Bearer " + this.apiService.getToken();
    console.log(headerSettings['Authorization'])
    const newHeader = new HttpHeaders(headerSettings);

    request = request.clone({
      headers: newHeader
    });

    return next.handle(request);
  }
}
