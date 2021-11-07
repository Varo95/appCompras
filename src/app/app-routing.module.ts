import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { AddbudgetComponent } from './budgets/addbudget/addbudget.component';
import { BudgetsComponent } from './budgets/budgets/budgets.component';
import { EditbudgetComponent } from './budgets/editbudget/editbudget.component';
import { AddprovidersComponent } from './providers/addproviders/addproviders.component';
import { EditprovidersComponent } from './providers/editproviders/editproviders.component';
import { ProvidersComponent } from './providers/providers/providers.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {path:'', component:StartComponent},
  {path:'providers', component:ProvidersComponent},
  {path:'providers/addprovider',component:AddprovidersComponent},
  {path:'addbudget',component:AddbudgetComponent},
  {path:'budgets', component:BudgetsComponent},
  {path:'editbudget/:id',component:EditbudgetComponent},
  {path:'editproviders/:id', component:EditprovidersComponent },
  {path:'register', component:RegisterComponent},
  {path:'**', component:StartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
