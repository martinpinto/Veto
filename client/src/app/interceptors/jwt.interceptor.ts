import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    // @ts-ignore: correct implementation
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let token = localStorage.getItem('access_token');
        if (token) {
            const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}`
            });
            const cloned = request.clone({headers});
            // @ts-ignore: correct handle
            return next.handle(cloned);
        }
         
        // @ts-ignore: correct handle
        return next.handle(request);
    }
}
