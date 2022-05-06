import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XsrfInterceptorService implements HttpInterceptor{

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({
      withCredentials: true
    });
    
    let csrfToken = this.tokenExtractor.getToken() as string;

    if(csrfToken != null) {
      req = req.clone({setHeaders: { "X-XSRF-TOKEN": csrfToken}});
    }

    return next.handle(req);
  }
}
