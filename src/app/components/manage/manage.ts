import {AfterViewInit, Component, inject, LOCALE_ID, ViewChild} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Sidenav} from '../sidenav/sidenav';
import {Toolbar} from '../toolbar/toolbar';
import {Budget, Provider} from '../../interfaces';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {FirestoreService} from '../../services/firestore';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AddEdit} from '../add-edit/add-edit';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {Timestamp} from '@firebase/firestore'

@Component({
  selector: 'app-manage',
  providers: [{
    provide: LOCALE_ID,
    useValue: 'es-ES'
  }],
  imports: [DatePipe, CurrencyPipe, MatSidenavModule, Sidenav, Toolbar, MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule, MatToolbarModule, MatMenuModule],
  templateUrl: './manage.html',
  styleUrl: './manage.scss',
})
export class Manage implements AfterViewInit {
  @ViewChild(MatTable)
  public table: MatTable<Budget | Provider> | undefined;
  @ViewChild(MatPaginator)
  public paginator: MatPaginator | undefined;
  public dataSource: MatTableDataSource<Budget | Provider> = new MatTableDataSource<Budget | Provider>([]);
  public displayedColumns: string[];
  public showMenu: boolean = false;
  public isModalShowed: boolean = false;
  private budgetColumns: string[] = ['provider', 'date', 'concept', 'base', 'iva', 'total', 'actions'];
  private providerColumns: string[] = ['name', 'cif', 'phone', 'actions'];
  private addEditSheet: MatBottomSheet = inject(MatBottomSheet);

  constructor(private readonly fireStore: FirestoreService) {
    this.displayedColumns = this.budgetColumns;
    this.menuOnClick('Budgets');
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public async menuOnClick(event: 'Budgets' | 'Providers'): Promise<void> {
    this.displayedColumns = event === 'Budgets' ? this.budgetColumns : this.providerColumns;
    this.fireStore.getItems<Budget | Provider>(event).subscribe((next: (Budget | Provider)[]): void => {
      this.dataSource.data = next;
    });
    this.showMenu = false;
  }

  public showModal(item?: Budget | Provider): void {
    const template: Budget | Provider = this.displayedColumns === this.budgetColumns ? {
      provider: '',
      date: Timestamp.now(),
      concept: '',
      base: 0,
      type: '',
      iva: 21,
      total: 0,
      documentRef: undefined
    } : {
      name: '',
      cif: '',
      direction: '',
      cp: '',
      location: '',
      province: '',
      phone: 0,
      email: '',
      contact: '',
      documentRef: undefined
    };
    this.isModalShowed = true;
    this.addEditSheet.open(AddEdit, {data: item ?? template}).afterDismissed().subscribe(async (data: Budget | Provider | undefined): Promise<void> => {
      if(data){
        if(data.documentRef !== undefined){
          await this.fireStore.editItem(data);
        }else{
          data = await this.fireStore.addItem(data);
        }
        this.dataSource.data = [...this.dataSource.data, {...data}];
        this.isModalShowed = false;
      }
    });
  }

  public async deleteItem(item: Budget | Provider): Promise<void> {
    await this.fireStore.deleteItem(item)
  }

}
