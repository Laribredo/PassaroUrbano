import { Injectable } from "@angular/core";
import { Pedido } from "./shared/pedido.model";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/observable";

import { URL_API } from "./app.api";

@Injectable()
export class OrdemCompraService{

    constructor(
        private http:Http
    ){}

    public efetivarCompra(pedido:Pedido):Observable<any>{
        
        let headers:Headers = new Headers   
        headers.append('Content-Type','application/json')

        return this.http.post(`${URL_API}pedidos`,JSON.stringify(pedido),new RequestOptions({headers:headers}))
        .map( res => {
            return res.json()})
    }
}