import { Oferta } from "./shared/oferta.model";
import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { URL_API } from "./app.api";
import { Observable }from 'rxjs';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'

@Injectable()
export class OfertasService{

    constructor( private http: Http ){}
    
    public getOfertas(): Promise<Oferta[]>{
        return this.http.get(`${URL_API}ofertas?destaque=true`)
        .toPromise().then( (resposta:Response) => resposta.json()); 
    }

    public getOfertaPorId(id:number):Promise<Oferta>{
        return this.http.get(`${URL_API}ofertas?id=${id}`)
        .toPromise().then((resposta:Response) => resposta.json()[0])
    }

    public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]>{        
        return this.http.get(`${URL_API}ofertas?categoria=${categoria}`)
        .toPromise().then( (resposta:Response) => resposta.json());
    }

    public getComoUsarOfertaPorId(id: number): Promise<string>{
        return this.http.get(`${URL_API}como-usar?id=${id}`).toPromise().then((res:Response) => {            
            return res.json()[0].descricao;
        });
    }

    public getOndeFicaPorId(id:number): Promise<string>{
        return this.http.get(`${URL_API}onde-fica?id=${id}`).toPromise().then((res:Response) =>{
            console.log(res.json());            
            return res.json()[0].descricao
        })
    }

    public getOfertasPorBusca(termo:string):Observable<any>{
        return this.http.get(`${URL_API}ofertas?descricao_oferta_like=${termo}`)
        .retry(10)
        .map((res:Response) =>{
            return res.json()
        })
    }
}