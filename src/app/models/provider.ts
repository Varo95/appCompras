export class Provider {
    public id: string;
    public name: string;
    public cif: string;
    public address: string;
    public cp: string;
    public location: string;
    public provincia: string;
    public phone: string;
    public email: string;
    public contact: string;

    constructor(id: string, name: string, cif: string, address: string, cp: string, location: string, provincia: string, phone: string, email: string, contact: string) {
        this.id = id;
        this.name = name;
        this.cif = cif;
        this.address = address;
        this.cp = cp;
        this.location = location;
        this.provincia = provincia;
        this.phone = phone;
        this.email = email;
        this.contact = contact;
    }

    public getId(): string {
        return this.id;
    }
    public setId(id: string): void {
        this.id = id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(provider: string): void {
        this.name = provider;
    }
    public getCif(): string {
        return this.cif;
    }
    public setCif(cif: string): void {
        this.cif = cif;
    }
    public getAddress(): string {
        return this.address;
    }
    public setAddress(address: string): void {
        this.address = address;
    }
    public getCp(): string {
        return this.cp;
    }
    public setCp(cp: string): void {
        this.cp = cp;
    }
    public getLocation(): string {
        return this.location;
    }
    public setLocation(location: string): void {
        this.location = location;
    }
    public getProvincia(): string {
        return this.provincia;
    }
    public setProvincia(provincia: string): void {
        this.provincia = provincia;
    }
    public getPhone(): string {
        return this.phone;
    }
    public setPhone(phone: string): void {
        this.phone = phone;
    }
    public getEmail(): string {
        return this.email;
    }
    public setEmail(email: string): void {
        this.email = email;
    }
    public getContact(): string {
        return this.contact;
    }
    public setContact(contact: string): void {
        this.contact = contact;
    }
}