import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [MainComponent],
  exports: [MainComponent],
  imports: [CommonModule, NgOptimizedImage, MainRoutingModule],
  providers: [],
})
export class MainModule {}
