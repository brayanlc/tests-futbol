import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContentLayoutComponent} from "./layouts/content-layout/content-layout.component";
import {authGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./feature/auth/login/login.component').then(
            (c) => c.LoginComponent,
          ),
      },
    ],
  },
  {
    path: 'teams',
    component: ContentLayoutComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./feature/teams/teams-list/teams-list.component').then(
            (c) => c.TeamsListComponent,
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./feature/teams/teams-create/teams-create.component').then(
            (c) => c.TeamsCreateComponent,
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./feature/teams/teams-create/teams-create.component').then(
            (c) => c.TeamsCreateComponent,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
