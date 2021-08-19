import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GasolinaRoutingModule } from './gasolina-routing.module';
import {GasolinaFormComponent} from "./views/gasolina-form/gasolina-form.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    GasolinaFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GasolinaRoutingModule,
  ]
})
export class GasolinaModule { }
