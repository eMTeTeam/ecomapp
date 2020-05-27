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

       headerSettings['Authorization'] = "Bearer " + "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZiOGNhNWI3ZDhkOWE1YzZjNjc4ODA3MWU4NjZjNmM0MGYzZmMxZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM3MjcyMTU1NzczMDk4OTM0ODMiLCJlbWFpbCI6InNlbGxlcjJtaXRhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiSjVKVnU5R0d3dTB2clZzMnVvdUZnUSIsImlhdCI6MTU5MDYxMjAyNiwiZXhwIjoxNTkwNjE1NjI2fQ.ZEcvDQZGsDp0w5pkforO4nKNQzvkbiEkZ7mghqemDEV6NSg22iPsLWoMER-30mDAW6tEmpqv-32XRbN_PxYjO_2LzIriMU9KwJcRnKQSUaQE0z9_eCb6Slh6aJBsUbwYYC4qhuvGoFgatqB0ZnzGW5qKaa7Np4ABmT2BVRT9y2otHxo8hpg3nNBVhvx_ivqAZ371sujL18Nec0tVNMbHQS0M7WpF77rRvxPvHBykMoEmbUA0pdgbgwSuZlv4OHzbFXaXNRFUxtdLzq3ACOLbUPY_AVs3zvGEiS5UKWGVSpp_1PbNNANIVGAQauSt0oOgv7zYfW6dnP_fcb9QDrKksg";

       //  headerSettings['Authorization'] = this.apiService.getToken();

        const newHeader = new HttpHeaders(headerSettings);

        request = request.clone({
            headers: newHeader
        });

        return next.handle(request);
    }
}
