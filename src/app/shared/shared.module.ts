import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeleteConfirmationDialogComponent} from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import {MaterialModule} from "../material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    DeleteConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule {
}
