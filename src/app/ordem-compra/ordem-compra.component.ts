import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from "../carrinho.service";
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedido:number
  public itensCarrinho: ItemCarrinho[] = []

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService) { }

  public formulario: FormGroup = new FormGroup(
    {
      "endereco": new FormControl(null,[ Validators.required, Validators.min(1) ]),
      "numero": new FormControl(null,[ Validators.required, Validators.min(5)]),
      "complemento":new FormControl(null),
      "formaPagamento":new FormControl(null,[ Validators.required ])
    }
  )

  ngOnInit() {

    this.itensCarrinho = this.carrinhoService.getItens();
    console.log(this.itensCarrinho)
    
  }

  public confirmarCompra(): void {
    if(this.formulario.status == "INVALID")
    {
      let vet:string[] = ["endereco","numero","complemento","formaPagamento"]
      vet.forEach((teste)=>{
       if(!this.formulario.get(teste).valid)
       {
          this.formulario.get(teste).markAsTouched()
       }
      })
    }else{

      if(this.carrinhoService.getItens().length != 0)
      {
        let pedido:Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
        this.carrinhoService.getItens())     

        this.ordemCompraService.efetivarCompra(pedido).subscribe(res => {
          this.idPedido = res.id
          this.carrinhoService.limparCarrinho();
        })
      }else{
        alert("Você não selecionou nenhum item para compra")
      }
    }    
  }

  public adicionar(item:ItemCarrinho):void{
    this.carrinhoService.adicionarQuantidade(item)
  }

  public remover(item:ItemCarrinho):void{
    this.carrinhoService.removerQuantidade(item)
  }
}
