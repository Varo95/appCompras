import {Component, output, OutputEmitterRef} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {AuthService} from '../../services/auth';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  imports: [MatIconModule, MatListModule, MatToolbarModule, MatButton, MatIconButton, MatMenu, MatMenuItem, MatMenuTrigger],
  template: `
    <mat-toolbar class="fixed-top customNavbar">
      <button mat-icon-button (click)="this.openHideMenu.emit(true)"><mat-icon fontIcon="menu"></mat-icon></button>
      AppCompras
      <div style="margin-left:auto"></div>
      <button matButton [matMenuTriggerFor]="menu"><mat-icon fontIcon="account_circle"></mat-icon>{{this.displayUsername}}</button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="this.logout()"><mat-icon fontIcon="logout"></mat-icon>Cerrar Sesión</button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [
    '.customNavbar{\n' +
    '  background-color: var(--mat-sys-primary-container);\n' +
    '}'
  ]
})
export class Toolbar {
  public displayUsername: string = '';
  public openHideMenu: OutputEmitterRef<boolean> = output<boolean>();

  constructor(private readonly auth: AuthService) {
    this.auth.loggedUser.subscribe(user => {
      if (user !== null) {
        this.displayUsername = user.displayName !== null ? user.displayName as string : user.email as string;
      }
    });
  }

  public async logout(): Promise<void>{
    await this.auth.logout();
  }

}
