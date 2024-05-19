import { NgModule } from "@angular/core";
import { StoreComponent } from './store.component';
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MenuComponent } from "./menu/menu.component";
import { RouterModule } from "@angular/router";
import { StoreRoutingModule } from "./store-routing.module";
import { CommonModule } from "@angular/common";
import { ShowroomComponent } from './showroom/showroom.component';
import { ShowroomcardComponent  } from './showroomcard/showroomcard.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    MenuComponent,
    StoreComponent,
    ShowroomComponent,
    ShowroomcardComponent 
  ],
  imports: [
    RouterModule,
    StoreRoutingModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    MatCardModule
  ]
})
export class StoreModule {

}