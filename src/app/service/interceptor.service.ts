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

       headerSettings['Authorization'] = "Bearer " + "eyJhbGciOiJSUzI1NiIsImtpZCI6ImZiOGNhNWI3ZDhkOWE1YzZjNjc4ODA3MWU4NjZjNmM0MGYzZmMxZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MzcxMjgzODczMDEtY3RhcDNqdWszMWxkaDl0NmJpZHU3OTJ0MmdxdTJuOTUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQzMTk1NjU4Nzk4NjM2NTQ4MDkiLCJlbWFpbCI6ImJ1eWVyMm1pdGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJLY3hkckduOTlqbWJkYVVObmxUTkd3IiwiaWF0IjoxNTkwNjk5MDQxLCJleHAiOjE1OTA3MDI2NDF9.WrqKhqjeVFi_EXwXsYXDyBN5xNySiA7EvjAAwaYGohN_vC9QtYcmPmp0q8mALwOzQ1qbXQ9OTs1MJfTaabfLQ7HuiTsciOAjIIv-FXT0aIu-y5Gmi3fjxXLKXh6wNBomL19MBJ7unN76zQJt1kPYF9BzjBzCdybWGwp1BPwDkJ5X4-4Rl-EkonKw1fkFbY5y-_8xSXQKY29ug65QP4ptyw-gPwKqU5Q93r4doIROokxHl-MOsa9BFgULYZ9hMVH9WlZiBOw-PT8uqd-qPeFCA4-l1rgo7NzVlFIWf7_nrnVbAfsRQpvr1zAkxuZuj3WFvadsb9MNnu4kZmd3j_g5eA";

       //  headerSettings['Authorization'] = this.apiService.getToken();

        const newHeader = new HttpHeaders(headerSettings);

        request = request.clone({
            headers: newHeader
        });

        return next.handle(request);
    }
}
