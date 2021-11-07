import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { list } from 'rxfire/database';
import { v4 } from 'uuid';
import { Provider } from '../models/provider';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(private db:AngularFireDatabase) { }

  public getProviders():Array<Provider> {
    let list: any[] = [];
    this.db.database.ref().child("providers").get().then((data) => {
      const providers = data.val();
      for (let provider in providers) {
        list.push({ key: provider, ...providers[provider] });
      }
    })
    return list;
  }

  public persistProvider(provider:Provider):void{
    if(provider.getId()=="-1"){
      provider.setId(v4());
    }
    this.db.database.ref().child("providers").child(provider.getId()).set(provider);  
  }

  public removeProvider(id:string):void{
    this.db.database.ref().child("providers").child(id).remove();
  }

  async getProvider(id: string) {
    let tmp = await this.db.database.ref().child("providers").child(id).get();
    let result = tmp.val();
    result.$key = id;
    return result;
  }
}
