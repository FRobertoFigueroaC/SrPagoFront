import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'gasolina', loadChildren: ()=> import('./gasolina/gasolina.module').then(m => m.GasolinaModule )
  },
  {
    path: 'mapas', loadChildren: ()=> import('./mapas/mapas.module').then(m => m.MapasModule )
  },
  {
    path: '**',
    redirectTo: 'gasolina'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
