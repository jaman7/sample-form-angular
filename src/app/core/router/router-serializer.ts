import { Injectable } from '@angular/core';
import { RouterStateSerializer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterStateUrl } from './router.state';

@Injectable()
export class RouterSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route: ActivatedRouteSnapshot = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const { url } = routerState;
    const { queryParams } = routerState.root;
    const { params } = route;
    return { url, params, queryParams };
  }
}
