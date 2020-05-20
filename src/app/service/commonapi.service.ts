import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonapiService {
bearerToken: string;
  constructor() { }

  getApiURL = (controller: string, endpoint: string) => {
    const apiVersion = '/v1';
    if (endpoint && endpoint != '') {
      return environment.url + controller + apiVersion + '/' + endpoint;
    }
    else {
      return environment.url + controller + apiVersion;
    }
  }

  getToken()
  {
    return this.bearerToken;
  }

  setToken(token: string)
  {
    return this.bearerToken=token;
  }

}
