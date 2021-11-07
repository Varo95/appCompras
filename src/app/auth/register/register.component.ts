import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/servicies/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;
  userdata: any;
  erroresForm = {
    'email': '',
    'password': ''

  }
  mensajesValidacion = {
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


  /*onValueChanged(data?: any) {
    if (!this.registroForm) { return; }
    const form = this.registroForm;
    for (const field in this.erroresForm) {
      this.erroresForm[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.mensajesValidacion[field];
        for (const key in control.errors) {
          this.erroresForm[field] += messages[key] + ' ';
        }
      }
    }
  }*/

  constructor(private formBuilder: FormBuilder, private autService: AuthService, private router: Router, private activatedRouter: ActivatedRoute) {
    this.registroForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.registroForm.valueChanges.subscribe(data => {
      //this.onValueChanged(data));
      //this.onValueChanged();
    });
  }

  onSubmit() {
    this.userdata = this.saveUserdata();
    this.autService.registerUser(this.userdata);
    this.router.navigate(['/']);
    this.registroForm.reset();
  }

  saveUserdata() {
    const saveUserdata = {
      email: this.registroForm.get('email')?.value,
      password: this.registroForm.get('password')?.value,
    };
    return saveUserdata;
  }

}
