import {Component, Inject, inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Budget, Provider} from '../../interfaces';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FirestoreService} from '../../services/firestore';
import {MatSelectModule} from '@angular/material/select';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter
} from '@angular/material/core';
import {DocumentReference} from '@angular/fire/firestore';
import {Timestamp} from '@firebase/firestore'


@Component({
  selector: 'app-add-edit',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButton,
    MatIconModule,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [{provide: DateAdapter, useClass: NativeDateAdapter}, {
    provide: MAT_DATE_FORMATS,
    useValue: MAT_NATIVE_DATE_FORMATS
  }],
  templateUrl: './add-edit.html',
  styleUrl: './add-edit.scss',
})
export class AddEdit {
  public readonly form: FormGroup;
  public readonly itemType: 'Budget' | 'Provider';
  public readonly providers$: Observable<Provider[]>;
  public readonly docId: DocumentReference | undefined;
  private readonly bottomSheetRef: MatBottomSheetRef<AddEdit, Budget | Provider> = inject<MatBottomSheetRef<AddEdit, Budget | Provider>>(MatBottomSheetRef);

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: Budget | Provider | undefined,
              private readonly firestore: FirestoreService,
              private readonly formBuilder: FormBuilder) {
    this.itemType = 'total' in data! ? 'Budget' : 'Provider';
    this.docId = data?.documentRef;
    this.providers$ = this.firestore.getItems<Provider>('Providers');
    const formGroup = this.itemType === 'Budget' ? {
      provider: [`${(this.data as Budget).provider}`, Validators.required],
      date: [((this.data as Budget).date as Timestamp).toDate(), Validators.required],
      concept: [`${(this.data as Budget).concept}`, [Validators.required, Validators.minLength(10)]],
      base: [`${(this.data as Budget).base}`, Validators.required],
      type: [`${(this.data as Budget).type}`, Validators.required],
      iva: (this.data as Budget).iva,
      total: (this.data as Budget).total
    } : {
      name: [`${(data as Provider).name}`, Validators.required],
      cif: [`${(data as Provider).cif}`, Validators.required],
      direction: [`${(data as Provider).direction}`, Validators.required],
      cp: [`${(data as Provider).cp}`, Validators.required],
      location: [`${(data as Provider).location}`, Validators.required],
      province: [`${(data as Provider).province}`, Validators.required],
      phone: [`${(data as Provider).phone}`, Validators.required],
      email: [`${(data as Provider).email}`, Validators.required],
      contact: [`${(data as Provider).contact}`, Validators.required]
    }
    this.form = this.formBuilder.group(formGroup);
    this.form.valueChanges.subscribe(value => {
      this.form.value.iva = Number(value.base * value.type);
      this.form.value.total = Number(value.base) + Number(this.form.value.iva);
    });
  }

  public async saveItem(): Promise<void> {
    this.data = this.form.value;
    this.data!.documentRef = this.docId;
    this.bottomSheetRef.dismiss(this.data);
  }

  public getProvinces(): string[] {
    return [
      'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona',
      'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
      'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
      'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lérida', 'Lugo',
      'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Las Palmas',
      'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
      'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
      'Zamora', 'Zaragoza'];
  }

}
