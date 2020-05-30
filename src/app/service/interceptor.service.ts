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

       headerSettings['Authorization'] = "Bearer " + "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZiOGNhNWI3ZDhkOWE1YzZjNjc4ODA3MWU4NjZjNmM0MGYzZmMxZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI1MTYwNzUwNzUxNDgyMzEzODQiLCJlbWFpbCI6ImJ1eWVyMW1pdGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiIzdVU3Y0VZNUc3MmJiOUpuSU83NXFRIiwiaWF0IjoxNTkwODU2MDY0LCJleHAiOjE1OTA4NTk2NjR9.B8pGQtmXnuzjVEZp1Pp1YQVwwp2R-7Y_E_hqqo95UZ34nQSYrvvr2mZAkxI8ZqiGmPMNScSfekiJhVq-OaMNYay_r8zz0_A3yVLC-mvYLwswlRDUNuOzAMqbbt7DKpaufuLW7hLiN-FpHV4j_FrfWrd13MhYCmjtbPzV1lh7ZUcCZxwsdjumRBZGq784e4JT0XwH5sgO_gaOCL2YN6GhIh2Up_34di8PTY3lg7128YJVDNIAb_2tfZSs6EzZh-4ePcIAO2LuqM3Z57x4-e1TJHLS59auvxUhG75qjY_VzLq20x4PUFawWTgvLbuPp5OPGmUD-mVqZZpqGF8qzs_o6g";

       //  headerSettings['Authorization'] = this.apiService.getToken();

        const newHeader = new HttpHeaders(headerSettings);

        request = request.clone({
            headers: newHeader
        });

        return next.handle(request);
    }
}
