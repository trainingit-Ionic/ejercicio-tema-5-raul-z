import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },

  /*
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/public/home/home.module#HomePageModule' },
  { path: 'clients', loadChildren: './pages/private/clients/clients.module#ClientsPageModule' },
  { path: 'providers', loadChildren: './pages/private/providers/providers.module#ProvidersPageModule' },
  { path: 'orders', loadChildren: './pages/private/orders/orders.module#OrdersPageModule' },
  { path: 'invoices', loadChildren: './pages/private/invoices/invoices.module#InvoicesPageModule' },
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
