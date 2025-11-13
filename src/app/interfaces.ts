import { DocumentReference} from '@angular/fire/firestore';
import {Timestamp} from '@firebase/firestore';

export interface UserCredentials {
  email: string,
  password: string
}

export interface MenuItem {
  type: 'Budgets' | 'Providers',
  icon: string,
  label: string
}

export interface Budget {
  provider: string,
  date: Date | Timestamp,
  concept: string,
  base: number,
  type: string,
  iva: number,
  total: number,
  documentRef: DocumentReference | undefined
}

export interface Provider{
  name: string,
  cif: string,
  direction: string,
  cp: string,
  location: string,
  province: string,
  phone: number,
  email: string,
  contact: string,
  documentRef: DocumentReference | undefined
}
