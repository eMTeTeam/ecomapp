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

       headerSettings['Authorization'] = "Bearer " + "eyJhbGciOiJSUzI1NiIsImtpZCI6ImIxNmRlMWIyYWIwYzE2YWMwYWNmNjYyZWYwMWY3NTY3ZTU0NDI1MmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM3OTM2NTUzNTQ3MzQxMTAwMzkiLCJlbWFpbCI6InNlbGxlcjFtaXRhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWVZUcTNJZlM4ajlIQmJ2a2VUMnhVQSIsImlhdCI6MTU5MjE1NjkxOCwiZXhwIjoxNTkyMTYwNTE4fQ.pUK85I3hfMuMoLvj2eI7Mf3_TlS-ASBrbZ6kW-9YKFv_bZq4KGD3PpKnJ9yuF3sr2x6dthFE5KUtr42dLp_7-Lkk2hlmZd14qH1xCg6kcUiA9_gMHnh8jwKp-OrXBfbsymrbu1uwlt06U_AQyM6QNLl3QqYd95qf-HKDmcxvgmUQt35KULhtrAzrm6T7eVG9QcW9xPQZtWk2RJMIdj7wTvii75VehW9EgP_aLrvSs5xIC6EVgGykyx9hrGO-ojhveh5S9nQXBG2kbw-6IMnWcCZfnX0mmoeOUOJ7ICX57lOodhwE7X-IJgeovSqmMGbhhxz339DMNWnjgsi7iRcddQ";

       //  headerSettings['Authorization'] = this.apiService.getToken();

        const newHeader = new HttpHeaders(headerSettings);

        request = request.clone({
            headers: newHeader
        });

        return next.handle(request);
    }
}
