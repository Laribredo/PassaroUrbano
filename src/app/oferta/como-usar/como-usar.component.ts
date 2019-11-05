import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params  } from "@angular/router";
import { OfertasService } from "../../ofertas.service";

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar = ''

  constructor(
    private route: ActivatedRoute,
    private service: OfertasService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((parametros:Params)=>{
      console.log(parametros.id)
      this.service.getComoUsarOfertaPorId(parametros.id).then(descricao =>{
        this.comoUsar = descricao     
      })
    })
  }

}
