import { Injectable } from '@angular/core';
import { HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {CommonapiService} from '../../app/service/commonapi.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private apiService: CommonapiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // HttpHeader object immutable - copy values
        const headerSettings: { [name: string]: string | string[]; } = {};

       headerSettings['Authorization'] = "Bearer " + "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk2MGE3ZThlODM0MWVkNzUyZjEyYjE4NmZhMTI5NzMxZmUwYjA0YzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM3OTM2NTUzNTQ3MzQxMTAwMzkiLCJlbWFpbCI6InNlbGxlcjFtaXRhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiRTBJMl8ySWduYi1kSlVDdktxT0VNUSIsImlhdCI6MTU5MDQyMzQ0MywiZXhwIjoxNTkwNDI3MDQzfQ.fpM4jX9lBTKPBBIC85I8S_nyhtuFKQv1mWcfvJtM0jH0qW8he8xH9jQy-6s8KxVdXXdjtAGsE7b3fugUYtCoZH1_LPcJlQ5cNAufhKhi5cniYXO3Kkpl3EGH6W66euQApxhAL4A6e2phxIxlzeGU40zmd7nSOByCHmUir9fZFPpTDq4zDYv9RnJdG2hLc7iao9KR4X1grNLFePZDzKYdgybhLu5YGZ812tieXAWsxl_HW98Fp_LSgZc-g0hviexyqf7HD4gQMmncc-f1MvDs0k2Ad9J57pVbUOR2xGaazFXeTr4Qb2JsVP6He8Ym5Z_Coqv9ldldDS6mULgVnj43AQ";

       //  headerSettings['Authorization'] = this.apiService.getToken();

        const newHeader = new HttpHeaders(headerSettings);

        request = request.clone({
            headers: newHeader
        });

        return next.handle(request);
    }
}
