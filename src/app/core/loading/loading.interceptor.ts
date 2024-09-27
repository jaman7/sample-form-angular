import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept<T>(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<T>> {
    const shouldIgnore = this.isIgnoreRequest(req);

    if (!shouldIgnore) {
      this.loadingService.addRequest();
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (!shouldIgnore) {
          this.loadingService.removeRequest();
        }
      })
    );
  }

  private isIgnoreRequest<T>(req: HttpRequest<T>): boolean {
    return req.headers.get('ignoreLoader') === 'true';
  }
}
