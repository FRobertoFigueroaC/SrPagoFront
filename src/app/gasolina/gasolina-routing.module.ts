import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GasolinaFormComponent} from "./views/gasolina-form/gasolina-form.component";

const routes: Routes = [{
  path: '',
  children: [
    {path: 'gasolina', component: GasolinaFormComponent},
    {path: '**', redirectTo: 'gasolina'}
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasolinaRoutingModule { }
