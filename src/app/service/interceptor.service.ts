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

       headerSettings['Authorization'] = "Bearer " + "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk2MGE3ZThlODM0MWVkNzUyZjEyYjE4NmZhMTI5NzMxZmUwYjA0YzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM3OTM2NTUzNTQ3MzQxMTAwMzkiLCJlbWFpbCI6InNlbGxlcjFtaXRhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiRDJqczVUSTVuSkxxQWREdHRocDh5ZyIsImlhdCI6MTU5MDM0NTQ0NiwiZXhwIjoxNTkwMzQ5MDQ2fQ.oSucObV7BhU2V3mSzqKf-rMVSYAx-8Fgf0sApVZmn_vENm7-hDoD5QozTf6HqXLS-o4IOXhMnsx3f3h5nc_ZymeVWOzAXOduXvSQ6_eNGWbxfer93hetLkrPBuf1rs8EtlAOyEEjqAceT74h6hqT3DyOqJs8ef6ZF9BxAoL3leV5PRrZps3BOvyOcSs-bEWFII-WhLRCSrSDyEzpx8CsWw5x3Gz2Zs1sHeP1D-RAxTiYUhLSWBxa_vSR2g5_Olr4mb9-HN8IzI-6qz_2p5SzfaYloU3gp8uxvrHWD2UjWQgBNHkZRUKJjar65geApXvRwDkiwSP_Y8APttD8qTGztA";

       //  headerSettings['Authorization'] = this.apiService.getToken();

        const newHeader = new HttpHeaders(headerSettings);

        request = request.clone({
            headers: newHeader
        });

        return next.handle(request);
    }
}
