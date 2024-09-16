import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadignService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isIgnoreRequest(req)) {
      this.loadignService.addRequest();
    }

    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if (!this.isIgnoreRequest(req)) {
              this.loadignService.removeRequest();
            }
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (!this.isIgnoreRequest(req)) {
              this.loadignService.removeRequest();
            }
          }
        }
      )
    );
  }

  private isIgnoreRequest(req: HttpRequest<any>): boolean {
    return req.headers.get('ignoreLoader') === 'true';
  }
}
