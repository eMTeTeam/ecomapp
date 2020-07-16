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

       headerSettings['Authorization'] = "Bearer " + "eyJhbGciOiJSUzI1NiIsImtpZCI6IjRlNGViZTQ4N2Q1Y2RmMmIwMjZhM2IyMjlkODZmMGQ0MjU4NDQ5ZmUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM3OTM2NTUzNTQ3MzQxMTAwMzkiLCJlbWFpbCI6InNlbGxlcjFtaXRhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTmtSa3c4c0M2M0M5OW1oeHZPVm03QSIsImlhdCI6MTU5NDkwMTM3OSwiZXhwIjoxNTk0OTA0OTc5fQ.yzsDHtZUJE4E94QLAIVouUZv7iWwiHNhQqsLVQUh0sxgy08YWJDktvV9TSI_b1iuRtaQLsC1aBXdFwIRYRdBuxLjI-w-t1JtH6LOrVgRC0AKYe5jhbThJhocU0VMKbKInISg2MtGeC6AQSEoIGVMCR6cHKosg-HOKM4X8J5H4IAiGBOVzwxKrwqMIJOGy_qHcIapmeBsrzWim_gVZEdu-tDYbFbqWdKmtjb2X51klx204yQQ5u0cQMY5eTCc2OJ0zLBkx3UGJr6AGL6-4mjmaP9rHRhio8gtD9zjZmPgXmysQIraSkiWRwEsaLf8Oo7ukcLehQ8AbqdDAHfJqmzJ-w";

       //  headerSettings['Authorization'] = this.apiService.getToken();

        const newHeader = new HttpHeaders(headerSettings);

        request = request.clone({
            headers: newHeader
        });

        return next.handle(request);
    }
}
