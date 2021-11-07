import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'src/app/models/provider';
import { ProvidersService } from 'src/app/servicies/providers.service';

@Component({
  selector: 'app-editproviders',
  templateUrl: './editproviders.component.html',
  styleUrls: ['./editproviders.component.css']
})
export class EditprovidersComponent implements OnInit {

  error = faExclamationCircle;
  valid = faCheckCircle;
  id: any;
  proveedor: any = {};
  proveedorForm: FormGroup;
  nombre: any;
  cif: any;
  cp: any = 0;
  localidad: any;
  telefono: any = 0;
  mail: any;
  direccion:any;
  p_contacto: any;
  provincia:any;

  provincias: string[] = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
    'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
    'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo',
    'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas', 'Pontevedra',
    'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Santa Cruz de Tenerife',
    'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'];

  constructor(private pf: FormBuilder,
    private proveedorService: ProvidersService, private router: Router, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(parametros => {
      this.id = parametros.id;
      this.proveedorService.getProvider(this.id).then((provider)=>this.proveedor=provider);
    });
    this.proveedorForm = this.pf.group({
      nombre: ['', Validators.required],
      cif: ['', Validators.required],
      direccion: ['', Validators.required],
      cp: ['', [Validators.required, Validators.minLength(5)]],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      telefono: ['', Validators.required],
      mail: ['', Validators.required],
      p_contacto: ['', Validators.required]
    });
  }

  

  onSubmit() {
    this.proveedor = this.saveProveedor();
    this.proveedorForm.reset();
  }

  ngOnInit() {
    this.onChanges();
  }

  saveProveedor() {
    let result = new Provider(this.id, "", "", "", "", "", "", "", "", "");
    const saveProvider = {
      name: this.proveedorForm.get('nombre')?.value,
      cif: this.proveedorForm.get('cif')?.value,
      address: this.proveedorForm.get('direccion')?.value,
      cp: this.proveedorForm.get('cp')?.value,
      location: this.proveedorForm.get('localidad')?.value,
      provincia: this.proveedorForm.get('provincia')?.value,
      phone: this.proveedorForm.get('telefono')?.value,
      email: this.proveedorForm.get('mail')?.value,
      contact: this.proveedorForm.get('p_contacto')?.value
    };
    result.setName(saveProvider.name);
    result.setCif(saveProvider.cif);
    result.setAddress(saveProvider.address);
    result.setCp(saveProvider.cp);
    result.setLocation(saveProvider.location);
    result.setProvincia(saveProvider.provincia);
    result.setPhone(saveProvider.phone);
    result.setEmail(saveProvider.email);
    result.setContact(saveProvider.contact);
    this.proveedorService.persistProvider(result);
  }

  onChanges(): void {
    this.proveedorForm.valueChanges.subscribe(valor => {
      this.nombre = valor.nombre;
      this.cif = valor.cif;
      this.direccion = valor.direccion;
      this.cp = valor.cp;
      this.localidad = valor.localidad;
      this.provincia = valor.provincia;  
      this.telefono = valor.localidad;
      this.mail = valor.mail;
      this.p_contacto = valor.p_contacto;
    });
  }
}
