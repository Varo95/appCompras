import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {UserCredentials} from '../../interfaces';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  public registerForm: FormGroup;
  public formErrors: Record<string, string> = {
    'email': '',
    'password': ''
  };
  private validationMessages: Record<string, Record<string, string>> = {
    'email': {
      'required': 'Email obligatorio',
      'email': 'Introduzca una dirección email correcta'
    },
    'password': {
      'required': 'Contraseña obligatoria',
      'pattern': 'La contraseña debe tener al menos una letra un número ',
      'minlength': 'y más de 6 caracteres'
    }
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]]
    });
  }

  public ngOnInit(): void {
    this.registerForm.valueChanges.subscribe((): void => {
      this.onValueChanged();
    });
  }

  private onValueChanged(): void {
    if (!this.registerForm) { return; }
    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field as keyof typeof this.formErrors] = '';
      const control: AbstractControl<any, any> | null = this.registerForm.get(field);
      if (control && control.dirty && control.invalid) {
        const messages: Record<string, string> = this.validationMessages[field as keyof typeof this.validationMessages];
        for (const key in control.errors) {
          if (messages[key]) {
            this.formErrors[field as keyof typeof this.formErrors] += messages[key] + ' ';
          }
        }
      }
    }
  }

  public onSubmit(): void {
    this.authService.registerUser(this.saveUserdata());
    this.registerForm.reset();
  }

  private saveUserdata(): UserCredentials {
    return {
      email: this.registerForm.get('email')?.value as string,
      password: this.registerForm.get('password')?.value as string,
    };
  }

  public async redirectLogin(): Promise<void> {
    await this.router.navigate(['login']);
  }

}
