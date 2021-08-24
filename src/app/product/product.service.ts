import {Injectable} from '@angular/core';
import {Product} from "../model/product.model";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFirestore} from "@angular/fire/firestore";
import {BaseService} from "../core/base-service/base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  constructor(private db: AngularFireDatabase, firestore: AngularFirestore) {
    super(firestore, 'products');
  }

  addProduct(product: Product) {
    this.add(product).subscribe(response => {
      console.log('Product added successfully !!!')
    });
  };

  getAll(): Observable<Product[]> {
    return this.getAllItems();
  }

  onDelete(id: string) {
    return this.delete(id);
  }

  onUpdate(product: Product) {
    this.update(product).subscribe(response => {
        console.log('updated successfully ', response);
      }
    )
  }
}
