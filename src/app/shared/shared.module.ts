import { NgModule } from '@angular/core';
import { SharedLibraryModule } from './shared-library.module';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  imports: [SharedLibraryModule, DirectivesModule],
  exports: [SharedLibraryModule, DirectivesModule],
})
export class SharedModule {}
