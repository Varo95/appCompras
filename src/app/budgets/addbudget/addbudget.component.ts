import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { BudgetService } from 'src/app/servicies/budget.service';
import { Budget } from 'src/app/models/budget';
import { Provider } from 'src/app/models/provider';

@Component({
  selector: 'app-addbudget',
  templateUrl: './addbudget.component.html',
  styleUrls: ['./addbudget.component.css']
})
export class AddbudgetComponent implements OnInit {

  error = faExclamationCircle;
  valid = faCheckCircle;
  budgetForm: FormGroup;
  budget: any;
  base: any;
  type: any;
  iva: any = 0;
  total: any = 0;

  constructor(private pf: FormBuilder, private budgetservide:BudgetService) {
    this.budgetForm = this.pf.group({
      provider: '',
      date: '',
      concept: '',
      base: '',
      type: '',
      iva: '',
      total: ''
    });
  }

  ngOnInit(): void {
    this.budgetForm = this.pf.group({
      provider: ['', Validators.required],
      date: ['', Validators.required],
      concept: ['', [Validators.required, Validators.minLength(10)] ],
      base: ['', Validators.required],
      type: ['', Validators.required],
      iva: this.iva,
      total: this.total
    });
    this.onChanges();
  }

  onSubmit() {
    this.budget = this.saveBudget();
    this.budgetForm.reset();
  }

  saveBudget() {
    let result = new Budget("-1","","","","","","","");
    const saveBudget = {
      proveedor: this.budgetForm.get('provider')?.value,
      fecha: this.budgetForm.get('date')?.value,
      concepto: this.budgetForm.get('concept')?.value,
      base: this.budgetForm.get('base')?.value,
      tipo: this.budgetForm.get('type')?.value,
      iva: this.budgetForm.get('iva')?.value,
      total: this.budgetForm.get('total')?.value
    };
    result.setProvider(saveBudget.proveedor);
    result.setDate(saveBudget.fecha);
    result.setConcept(saveBudget.concepto);
    result.setBimpo(saveBudget.base);
    result.setIva(saveBudget.tipo);
    result.setImpva(saveBudget.iva);
    result.setTotal(saveBudget.total);
    this.budgetservide.persistBudget(result);
  }

  onChanges() {
    this.budgetForm.valueChanges.subscribe(valor => {
      this.base = valor.base;
      this.type = valor.type;
      this.budgetForm.value.iva = this.base * this.type;
      this.budgetForm.value.total = this.base + (this.base * this.type);
    });
  }
}
