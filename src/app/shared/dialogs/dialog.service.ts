import { Injectable, Injector } from '@angular/core';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DialogRef } from './dialogRef';
import { DIALOG_DATA } from './dialogToken';

export interface DialogConfig {
  data?: any
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private overlay: Overlay,
    private injector: Injector,
  ) { }

  open<T>(component:ComponentType<T>, config?: DialogConfig): DialogRef {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
    });

    // console.log(overlayRef);

    const dialogRef = new DialogRef(overlayRef);

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
    });

    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());

    return dialogRef;
  }
}
