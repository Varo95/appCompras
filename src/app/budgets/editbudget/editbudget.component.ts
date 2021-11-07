import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from 'src/app/models/budget';
import { BudgetService } from 'src/app/servicies/budget.service';

@Component({
  selector: 'app-editbudget',
  templateUrl: './editbudget.component.html',
  styleUrls: ['./editbudget.component.css']
})
export class EditbudgetComponent implements OnInit {

  budgetForm: FormGroup;
  provider:any;
  budget: any;
  bimpo: any;
  iva: any;
  impva: any = 0;
  total: any = 0;
  id: any;

  constructor(private pf: FormBuilder,private budgetservide:BudgetService, private router: Router,private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe( params => {
      this.id = params.id;
      this.budgetservide.getBudget(this.id).then(budget => this.budget = budget)
 });
    this.budgetForm = this.pf.group({
      provider: '',
      date: '',
      concept: '',
      bimpo: '',
      iva: '',
      impva: '',
      total: ''
    });
   }

  ngOnInit(): void {
    this.budgetForm = this.pf.group({
      provider: ['', Validators.required],
      date: ['', Validators.required],
      concept: ['', [Validators.required, Validators.minLength(10)] ],
      bimpo: ['', Validators.required],
      iva: ['', Validators.required],
      impva: this.impva,
      total: this.total
    });
    this.onChanges();
  }

  onSubmit() {
    this.budget = this.saveBudget();
    this.budgetForm.reset();
  }

  saveBudget() {
    let result = new Budget(this.id,"","","","","","","");
    const saveBudget = {
      provider: this.budgetForm.get('provider')?.value,
      fecha: this.budgetForm.get('date')?.value,
      concepto: this.budgetForm.get('concept')?.value,
      bimpo: this.budgetForm.get('bimpo')?.value,
      tipo: this.budgetForm.get('iva')?.value,
      impva: this.budgetForm.get('impva')?.value,
      total: this.budgetForm.get('total')?.value
    };
    result.setProvider(saveBudget.provider);
    result.setDate(saveBudget.fecha);
    result.setConcept(saveBudget.concepto);
    result.setBimpo(saveBudget.bimpo);
    result.setIva(saveBudget.tipo);
    result.setImpva(saveBudget.impva);
    result.setTotal(saveBudget.total);
    this.budgetservide.persistBudget(result);
  }

  onChanges() {
    this.budgetForm.valueChanges.subscribe(valor => {
      this.bimpo = valor.bimpo;
      this.iva = valor.iva;
      this.budgetForm.value.impva = this.bimpo * this.iva;
      this.budgetForm.value.total = this.bimpo + (this.bimpo * this.iva);
    });
  }

}
