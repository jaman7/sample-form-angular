import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { HomeService } from './home.service';
import { IHomeData } from './home.model';

export const fetchHomeResolver: ResolveFn<Observable<IHomeData[]>> = () => {
  const homeService = inject(HomeService);
  return homeService.getData();
};
