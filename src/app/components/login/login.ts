import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {UserCredentials} from '../../interfaces';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginForm: FormGroup | any;
  userdata: any;
  message: boolean = false;

  constructor(public authS: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]]
    });
  }

  public async redirectRegister(): Promise<void>{
    await this.router.navigate(['register']);
  }

  public login(): void {
    this.authS.googleLogin();
  }

  public onSubmit(): void {
    this.userdata = this.saveUserdata();
    this.authS.login(this.userdata);

    setTimeout((): void => {
      if (!this.authS.loggedUser) {
        this.message = true
      }
    }, 2000);
  }

  private saveUserdata(): UserCredentials {
    return {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
  }

}
