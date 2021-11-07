import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'src/app/models/provider';
import { ProvidersService } from 'src/app/servicies/providers.service';

@Component({
  selector: 'app-addproviders',
  templateUrl: './addproviders.component.html',
  styleUrls: ['./addproviders.component.css']
})
export class AddprovidersComponent implements OnInit {
  error = faExclamationCircle;
  valid = faCheckCircle;
  @ViewChild('formpro', { read: NgForm })
  formpro: any;
  provider: any;
  provincias: string[] = [ 
    'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona', 'Burgos', 'Cáceres', 'Cádiz','Cantabria','Castellón',
    'Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','IslasBaleares','Jaén','León',
    'Lérida','Lugo','Madrid', 'Málaga','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia',
    'Sevilla','Soria','Tarragona','Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora','Zaragoza' ]

  constructor(private providers:ProvidersService) {
    this.provider = {
      name: '',
      cif: '',
      address: '',
      pc: '',
      location: '',
      provincia: '',
      phone: null,
      email: '',
      contact: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.provider.name = this.formpro.value.name;
    this.provider.cif = this.formpro.value.cif;
    this.provider.address = this.formpro.value.address;
    this.provider.pc = this.formpro.value.pc;
    this.provider.location = this.formpro.value.location;
    this.provider.provincia = this.formpro.value.provincia;
    this.provider.phone = this.formpro.value.phone;
    this.provider.email = this.formpro.value.email;
    this.provider.contact = this.formpro.value.contact;
    this.saveProvider();
    this.formpro.reset();
  }
  saveProvider(){
    let result = new Provider("-1","","","","","","","","","");
    result.setName(this.provider.name);
    result.setCif(this.provider.cif);
    result.setAddress(this.provider.address);
    result.setCp(this.provider.pc);
    result.setLocation(this.provider.location);
    result.setProvincia(this.provider.provincia);
    result.setPhone(this.provider.phone);
    result.setEmail(this.provider.email);
    result.setContact(this.provider.contact);
    this.providers.persistProvider(result);
  }

}
