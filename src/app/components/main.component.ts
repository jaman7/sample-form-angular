import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LoadingService } from '@app/core/loading/loading.service';
import { fadeInOut } from '@app/shared/animations/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  animations: [fadeInOut],
})
export class MainComponent implements OnInit {
  showOutlet = false;

  isLoading = true;

  constructor(
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingService.loading
      .pipe(
        untilDestroyed(this),
        tap((loading: boolean) => {
          setTimeout(() => {
            this.isLoading = loading;
          }, 5);
        })
      )
      .subscribe();
  }

  getActiveRoute(): string {
    return this.router.url;
  }

  onActivate(): void {
    this.showOutlet = true;
  }

  onDeactivate(): void {
    this.showOutlet = false;
  }

  getRouterOutletState(outlet: RouterOutlet): ActivatedRoute | string {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
