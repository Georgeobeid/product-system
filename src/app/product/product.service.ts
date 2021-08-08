import {Injectable} from '@angular/core';
import {Product} from "../model/product.model";
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  onCreate(product: Product) {
    return this.db.list('products').push(product).then(() => {
      console.log('Added successfully');
    });
  }

  getAll() {
    return this.db.list('products').snapshotChanges()
      .pipe(map(changes => {
        // @ts-ignore
        return changes.map(data => ({id: data.payload.key, ...data.payload.val()}));
      }))
  }

  onDelete(id: string) {
    this.db.object(`products/${id}`).remove().then(() => {
      console.log('Deleted successfully');
    });
  }

  onUpdate(product: Product, id: string) {
    this.db.list('products').update(id, product).then(() => {
      console.log('Updated successfully');
    })
  }
}
