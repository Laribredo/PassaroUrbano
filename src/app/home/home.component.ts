import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Oferta } from "../shared/oferta.model";
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasService ]
})
export class HomeComponent implements OnInit {

  public oferta: Oferta[]

  constructor(
    private ofertasServices: OfertasService
  ) { }

  ngOnInit() {
    //this.oferta = this.ofertasServices.getOfertas();
    this.ofertasServices.getOfertas().then( ( oferta:Oferta[] ) =>{
      this.oferta = oferta
    })
  }

}
