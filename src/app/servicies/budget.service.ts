import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Budget } from '../models/budget';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  list:any[];
  constructor(private db:AngularFireDatabase) { 
    this.list=[];
  }

  public getBudgets():any[]{
    this.db.database.ref().child("budgets").on('value', (snapshot) => {
      const budgets = snapshot.val();
      if(this.list.length!=0){
        this.list=[]
      }
      for (let budget in budgets) {
        this.list.push({ key: budget, ...budgets[budget] });
      }
    });
    /*this.db.database.ref().child("budgets").get().then((data) => {
      const budgets = data.val();
      for (let budget in budgets) {
        list.push({ key: budget, ...budgets[budget] });
      }
    });*/
    return this.list;
  }

  public persistBudget(budget:Budget):void{
    if(budget.getId()=="-1"){
      budget.setId(v4());
    }
    this.db.database.ref().child("budgets").child(budget.getId()).set(budget);  
  }

  public removeBudget(id:string):void{
    this.db.database.ref().child("budgets").child(id).remove();
    this.getBudgets();
  }
  public async getBudget(id:string){
    let tmp = await this.db.database.ref().child("budgets").child(id).get();
    let result = tmp.val();
    result.$key = id;
    return result;
  }
  
}
