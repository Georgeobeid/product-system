import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {ProductListDataSource} from './product-list-datasource';
import {Product} from "../../model/product.model";
import {MatDialog} from "@angular/material/dialog";
import {ProductFormComponent} from "../product-form/product-form.component";
import {DeleteConfirmationDialogComponent} from "../../shared/delete-confirmation-dialog/delete-confirmation-dialog.component";
import {FormGroup} from "@angular/forms";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: ProductListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'price', 'quantity', 'energyEfficiency', 'isOrganic', 'isRecyclable', 'options'];

  constructor(public dialog: MatDialog,
              private service: ProductService) {
    this.dataSource = new ProductListDataSource();
  }

  ngAfterViewInit() {
    this.service.getAll().subscribe(value => {
      this.dataSource.data = value
      this.table.dataSource = value;
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(product?: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '250px',
      height: 'auto',
      data: product
    });
    dialogRef.afterClosed().subscribe((data: FormGroup) => {
      if (data) {
        if (data.value.id) {
          this.service.onUpdate(data.value);
        } else {
          this.service.addProduct(data.value);
        }
      }
    });
  }

  openDeleteDialog(product: Product) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === true) {
        if (product.id) {
          this.service.onDelete(product.id);
        }
      }
    });
  }
}
