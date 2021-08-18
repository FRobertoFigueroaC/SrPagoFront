import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GasolinaRoutingModule } from './gasolina-routing.module';
import {GasolinaFormComponent} from "./views/gasolina-form/gasolina-form.component";


@NgModule({
  declarations: [
    GasolinaFormComponent
  ],
  imports: [
    CommonModule,
    GasolinaRoutingModule,
  ]
})
export class GasolinaModule { }
