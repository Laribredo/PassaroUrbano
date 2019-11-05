import { Component, OnInit } from '@angular/core';
import { OfertasService } from "../ofertas.service";
import { Oferta } from "../shared/oferta.model";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import '../../app/util/rxjs-extensions'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas:Observable<Oferta[]>
  public ofertas2:Oferta[]
  public subjectPesquisa:Subject<string> = new Subject<string>();

  constructor(
    private service: OfertasService
  ) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
    //.debounceTime(1000) //executa a requisição após determinado tempo
    .distinctUntilChanged()
    .switchMap((termo:string)=>{
      if(termo.trim() === "")
      {
        return Observable.of<Oferta[]>([])
      }

      return this.service.getOfertasPorBusca(termo)
    }).catch((err:any) =>{
      console.log(err)
      return Observable.of<Oferta[]>([])
    })

    this.ofertas.subscribe((ofertas:Oferta[]) =>{
      console.log(ofertas);
    })
  }

  public pesquisa(termoDaBusca:string): void{
   this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa():void{
    this.subjectPesquisa.next('')
  }
}
