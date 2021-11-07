import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/models/provider';
import { ProvidersService } from 'src/app/servicies/providers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  providers:any[];

  constructor(private providersService:ProvidersService) {
    this.providers = this.providersService.getProviders();
   }
  ngOnInit(): void {
    
  }
  deleteProvider(id:string):void{
    
  }

}
