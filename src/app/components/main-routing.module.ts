import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { animation: true } },
  {
    path: 'home',
    loadChildren: () => import('./content/home/home.module').then(mod => mod.HomeModule),
    canActivate: [AuthGuard],
    data: { animation: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
