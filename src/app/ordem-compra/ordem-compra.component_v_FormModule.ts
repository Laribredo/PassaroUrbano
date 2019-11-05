import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { NgForm } from '@angular/forms';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  constructor(private ordemCompraService: OrdemCompraService) { }

  public idPedidoCompra:number

  @ViewChild('formulario', {static: false}) public formulario:NgForm

  itens: ItemCarrinho[]

  ngOnInit() {
    
  }

  confirmarCompra():void{
    let pedido:Pedido = new Pedido(
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento, 
      this.formulario.value.formaPagamento,
      this.itens
      )
      
    this.ordemCompraService.efetivarCompra(pedido).subscribe(res => {
       this.idPedidoCompra = res.id
    })
  }
}
