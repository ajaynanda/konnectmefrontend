import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NamePipe } from './pipes/name.pipe';



@NgModule({
  declarations: [LoaderComponent, NamePipe],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports:[
    LoaderComponent
  ]
})
export class SharedModule { }
