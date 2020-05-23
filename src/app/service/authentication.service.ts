import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { 
    
  }
  // googleSignInExternal(googleTokenId: string): Observable<SimpleError | ICredentials> {

  //   return this.httpClient.get(APISecurityRoutes.authRoutes.googlesigninexternal(), {
  //     params: new HttpParams().set('googleTokenId', googleTokenId)
  //   })
  //     .pipe(
  //       map((result: ICredentials | SimpleError) => {
  //         if (!(result instanceof SimpleError)) {
  //           this.credentialsService.setCredentials(result, true);
  //         }
  //         return result;

  //       }),
  //       catchError(() => of(new SimpleError('error_signin')))
  //     );

  // }
}
