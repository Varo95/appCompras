import {Component, output, OutputEmitterRef, signal, WritableSignal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MenuItem} from '../../interfaces';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-sidenav',
  imports: [MatIconModule, MatListModule, MatToolbarModule],
  template: `
      <mat-nav-list class="pt-4 p-2 d-flex flex-column h-100">
        @for (item of this.items(); track item.label; let i = $index) {
          <a mat-list-item [style]="this.itemClass[i]" (click)="this.menuClick.emit(item.type)">
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            <span matListItemTitle>{{ item.label }}</span>
          </a>
        }
      </mat-nav-list>
  `
})
export class Sidenav {
  public items: WritableSignal<MenuItem[]> = signal<MenuItem[]>([
    {type: 'Budgets', icon: 'receipt_long', label: 'Presupuestos'},
    {type: 'Providers', icon: 'group', label: 'Proveedores'}
  ]);

  public itemClass: string[];

  public menuClick: OutputEmitterRef<'Budgets' | 'Providers'> = output<'Budgets' | 'Providers'>();

  constructor() {
    this.itemClass = ['background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));', ''];
    this.menuClick.subscribe((value: 'Budgets' | 'Providers'): void =>{
      this.itemClass[value === 'Budgets' ? 0 : 1] = 'background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));';
      this.itemClass[value === 'Budgets' ? 1 : 0] = '';
    })
  }

}
