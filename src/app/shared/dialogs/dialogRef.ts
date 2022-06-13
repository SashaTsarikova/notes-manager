import { Observable, Subject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';

export class DialogRef {
  private afterClosedSubject = new Subject<any>();

  constructor(private overlayRef: OverlayRef) {

  }

  backdropClick(result?: any) {
    this.overlayRef.dispose();
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }

  close(result?: any) {
    this.overlayRef.dispose();
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
  }

  afterClosed(): Observable<any> {
    return this.afterClosedSubject.asObservable();
  }
}
