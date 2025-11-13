import {Inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, DocumentData, Firestore, updateDoc} from '@angular/fire/firestore';
import {Budget, Provider} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  constructor(@Inject(Firestore) private readonly firestore: Firestore){

  }

  public getItems<T>(type: string): Observable<T[]> {
    return collectionData(collection(this.firestore, type), {idField: 'documentRef'}) as Observable<T[]>;
  }

  public async addItem<T extends Budget | Provider>(item: T): Promise<T> {
    delete item.documentRef;
    const type: string = 'total' in item ? 'Budgets' : 'Providers';
    item.documentRef = await addDoc<DocumentData, DocumentData>(collection(this.firestore, type), item);
    return item;
  }

  public async editItem<T extends Budget | Provider>(item: T): Promise<void> {
    const type: string = 'total' in item ? 'Budgets' : 'Providers';
    await updateDoc<DocumentData, DocumentData>(doc(this.firestore, `${type}/${item.documentRef}`), {...item});
  }

  public async deleteItem<T extends Budget | Provider>(item: T): Promise<void> {
    const type: string = 'total' in item ? 'Budgets' : 'Providers';
    await deleteDoc<DocumentData, DocumentData>(doc(this.firestore, `${type}/${item.documentRef}`));
  }

}
