import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:5000/api/Products/v1/byCategory?categoryId=';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) { }

  getAllProduct(categoryId) {
    return this.http.get(baseUrl + categoryId + '&pageIndex=0&limit=10');
  }

  saveData(dataToApi) {
    var saveURL = "http://mitaisapi.azurewebsites.net/api/ProductCategories/v1";
    return this.http.post(saveURL, dataToApi,
      {
        headers: new HttpHeaders(
          {
            "content-Type": "application/json",
            "languageCode": "en"
           // "Authorization":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4Yjc0MWU4ZGU5ODRhNDcxNTlmMTllNmQ3NzgzZTlkNGZhODEwZGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDc0MDg3MTgxOTIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM3OTM2NTUzNTQ3MzQxMTAwMzkiLCJlbWFpbCI6InNlbGxlcjFtaXRhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoicEZCaGFQTU1ROGdFYzkwWW83MkpEQSIsImlhdCI6MTU4ODQxMTY3OCwiZXhwIjoxNTg4NDE1Mjc4fQ.x2urx8ydlv_y-rdAy9DfF61sWwuoKDE6wAv24kbeGSR1hPpP5bZCYscyYbowVRvnT9pjVBXJarAIKwlNcrGBOXFOcmUxPYClyC6dWnAyQQ6BFgeDf_8UMh-q6kBBg9cA3p33YCvBnkY0TVAra1-Lhcb8Wiljo5szuy5_FKHom8nREjxUCe4_I4_YkthXpIA8pSS_M_4TXrY6O8UwhVbFTZhFohHhtdm81yZ5wx4_O3dod9E_DBRxFJ8qjZx9ZFLmPGj0jZQbruPpM8aBX685PjiPNGkC3-EMOcXeOdoYWjcFBG7f7TbRFjO2XWqLdvfLnp5-9x4Ot42eQtQgFaVMvQ"
          }
        )
      });
  }
}
