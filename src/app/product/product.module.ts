import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductListComponent} from './product-list/product-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from "@angular/material/button";
import {ProductFormComponent} from './product-form/product-form.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFirestoreModule} from "@angular/fire/firestore";

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent],
  exports: [
    ProductListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FlexModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ]
})
export class ProductModule {
}
