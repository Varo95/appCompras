
export class Budget {
    public id:string;
    public provider: string;
    public date: string;
    public concept: string;
    public bimpo: string;
    public iva: string;
    public impva: string;
    public total: string;
    

    constructor(id:string,provider: string,date:string,concept:string,bimpo:string,iva:string,impiva:string,total:string) {
        this.id = id;
        this.provider = provider;
        this.date = date;
        this.concept = concept;
        this.bimpo = bimpo;
        this.iva = iva;
        this.impva = impiva;
        this.total = total;
       
    }

    public getId():string{
        return this.id;
    }
    public setId(id:string):void{
        this.id=id;
    }
    public getProvider():string{
        return this.provider;
    }
    public setProvider(provider:string):void{
        this.provider = provider;
    }
    public getDate():string{
        return this.date;
    }
    public setDate(date:string):void{
        this.date = date;
    }

    public getConcept():string{
        return this.concept;
    }
    public setConcept(concept:string):void{
        this.concept = concept;
    }

    public getBimpo():string{
        return this.bimpo;
    }
    public setBimpo(bimpo:string):void{
        this.bimpo = bimpo;
    }
    public getIva():string{
        return this.iva;
    }
    public setIva(iva:string):void{
        this.iva=iva;
    }

    public getImpva():string{
        return this.impva;
    }
    public setImpva(impva:string):void{
        this.impva = impva;
    }

    public getTotal():string{
        return this.total;
    }
    public setTotal(total:string):void{
        this.total = total;
    }

}