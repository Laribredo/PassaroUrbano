import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { OfertasService } from "../../ofertas.service";

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OfertasService]
})
export class OndeFicaComponent implements OnInit {

  public ondeFica:string = ''

  constructor(
    private route:ActivatedRoute,
    private service: OfertasService
  ) { }

  ngOnInit() {

    this.route.parent.params.subscribe((parametros:Params)=>{
      console.log(parametros.id)
      this.service.getOndeFicaPorId(parametros.id).then(descricao =>{
        this.ondeFica = descricao     
      })
    })
  }

}
