import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Not404Component } from './pages/not404/not404.component';

// Encargado de registrar rutas externas y a su vez indexa las rutas desacopladas
// monta la app -> cargue todo el contenido de rutas de los componentes
// monta el componente inicial, pero solamente él
// las demás páginas pasan a un estado de pre-carga
// luego se cargan solo cuando sean visitadas, los otros componentes están en modo espera
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.routes').then((r) => r.PagesRoutes),
  },
  { path: 'not-404', component: Not404Component },
  { path: '**', redirectTo: 'not-404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
