import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProvidersService } from './servicies/providers.service';
import { ProvidersComponent } from './providers/providers/providers.component';
import { StartComponent } from './start/start.component';
import { HeaderComponent } from './header/header.component';
import { AddprovidersComponent } from './providers/addproviders/addproviders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddbudgetComponent } from './budgets/addbudget/addbudget.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { BudgetService } from './servicies/budget.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BudgetsComponent } from './budgets/budgets/budgets.component';
import { EditbudgetComponent } from './budgets/editbudget/editbudget.component';
import { EditprovidersComponent } from './providers/editproviders/editproviders.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './servicies/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ProvidersComponent,
    StartComponent,
    HeaderComponent,
    AddprovidersComponent,
    AddbudgetComponent,
    BudgetsComponent,
    EditbudgetComponent,
    EditprovidersComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase())
  ],
  providers: [ProvidersService, BudgetService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
