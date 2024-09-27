import { BehaviorSubject } from 'rxjs';

export class LoadingService {
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private requestInProgress = 0;

  private timeoutCancel: any;

  changeRouter(): void {
    this.startLoading();
    this.resetTimeout();
  }

  addRequest(): void {
    if (this.requestInProgress === 0) {
      this.startLoading();
    }
    this.requestInProgress += 1;
    this.clearTimeout();
  }

  removeRequest(): void {
    if (this.requestInProgress > 0) {
      this.requestInProgress -= 1;
    }
    this.resetTimeout();
  }

  private startLoading(): void {
    if (!this.loading.getValue()) {
      this.loading.next(true);
    }
  }

  private stopLoading(): void {
    if (this.requestInProgress === 0 && this.loading.getValue()) {
      this.loading.next(false);
    }
  }

  private resetTimeout(): void {
    this.clearTimeout();
    this.timeoutCancel = setTimeout(() => this.stopLoading(), 200);
  }

  private clearTimeout(): void {
    if (this.timeoutCancel) {
      clearTimeout(this.timeoutCancel);
      this.timeoutCancel = null;
    }
  }
}
