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

       headerSettings['Authorization'] = "Bearer " + "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk2MGE3ZThlODM0MWVkNzUyZjEyYjE4NmZhMTI5NzMxZmUwYjA0YzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI1MTYwNzUwNzUxNDgyMzEzODQiLCJlbWFpbCI6ImJ1eWVyMW1pdGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJTTWhfLTN2Vy1ZYlZEaXZrMlJCMTdnIiwiaWF0IjoxNTkwMTgwNTg1LCJleHAiOjE1OTAxODQxODV9.aslYL_1_garhKM60r_XnoOip6DfBZNuIoLRPWQG4IftSRpiy2gsIAVxZmC0ZMVGuMqM25RTZxEh8zoFzPrZ5jVDHr6xNEJvB8YF1lgSSUml89rKDmViQjUii8ZQ_-S_Zmn7o7o-Tw7g66rTMgScPbI-oedQGiCupqM7OxWGOkei2Go77xhbkuIri39R8Inkvd-fmPQDS8I8256WI2X6-8-FQJHW-zukLcjnQ5gbmsSuHkDmOWMB_KiN_FGAtXMIjOBJFe-vYEcp0bHN-jEzp8Kd9Nydfg-EmBHf2iicptQuUvaQL5wh3md-wVtH-DwpxYuqNTQH8lpvUmecHxeYQ-A";

       //  headerSettings['Authorization'] = this.apiService.getToken();

        const newHeader = new HttpHeaders(headerSettings);

        request = request.clone({
            headers: newHeader
        });

        return next.handle(request);
    }
}
