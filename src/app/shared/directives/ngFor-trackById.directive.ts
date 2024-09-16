import { NgForOf } from '@angular/common';
import { Directive, Host } from '@angular/core';

export interface Item {
  id?: number | string;
  [key: string]: any | any[];
}

@Directive({
  selector: '[ngForTrackById]',
})
export class NgForTrackByIdDirective<T extends Item> {
  constructor(@Host() private ngFor: NgForOf<T>) {
    this.ngFor.ngForTrackBy = (index: number, item: T): number | string | undefined => item.id;
  }
}
