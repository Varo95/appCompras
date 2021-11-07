import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/models/budget';
import { BudgetService } from 'src/app/servicies/budget.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {

  budgets:any[];
  budgetservice:BudgetService;

  constructor(budgetservice:BudgetService) { 
    this.budgets = budgetservice.getBudgets();
    this.budgetservice = budgetservice;
  }

  ngOnInit(): void {
  }

  deleteBudget(id:string):void{
    this.budgetservice.removeBudget(id);
  }

}
