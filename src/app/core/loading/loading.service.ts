import { BehaviorSubject } from 'rxjs';

export class LoadingService {
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private requestInProgress = 0;

  private timeoutCancel: any;

  changeRouter(): void {
    this.clearTimeout();
    this.loading.next(true);
    this.timeoutCancel = setTimeout(() => this.checkComplete(), 200);
  }

  addRequest(): void {
    this.clearTimeout();
    if (this.requestInProgress === 0) {
      this.startLoading();
    }
    this.requestInProgress += 1;
  }

  removeRequest(): void {
    this.clearTimeout();
    this.requestInProgress = Math.max(0, this.requestInProgress - 1);
    this.timeoutCancel = setTimeout(() => this.checkComplete(), 200);
  }

  startLoading(): void {
    this.loading.next(true);
  }

  stopLoading(): void {
    if (this.requestInProgress === 0) {
      this.loading.next(false);
    }
  }

  private checkComplete(): void {
    if (this.requestInProgress === 0) {
      this.loading.next(false);
    } else {
      this.removeRequest();
    }
  }

  private clearTimeout(): void {
    if (this.timeoutCancel) {
      clearTimeout(this.timeoutCancel);
    }
  }
}
