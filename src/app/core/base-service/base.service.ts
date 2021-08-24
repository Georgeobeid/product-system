import {Inject, Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(private firestore: AngularFirestore,
              @Inject(String) protected uri: string) {
    this.collection = firestore.collection<T>(this.uri);
  }

  add(item: T): Observable<T> {
    const subject = new Subject<T>();
    this.collection.add(item).then(ref => {
      const newItem = {
        ...(item as T),
        id: ref.id
      };
      ref.set(newItem);
      subject.next(newItem);
    });
    return subject.asObservable();
  }

  getAllItems(): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return a.payload.doc.data() as T;
      }))
    );
  }

  delete(id: string): void {
    this.collection.doc(id).delete().then(() => {
      console.log('Deleted successfully !!')
    });
  }

  update(item: T): Observable<T> {
    const subject = new Subject<T>();
    // @ts-ignore
    this.collection.doc<T>(item.id).set(item).then(() => subject.next(item));
    return subject.asObservable();
  }
}
