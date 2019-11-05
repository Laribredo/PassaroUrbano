import { ItemCarrinho } from "./shared/item-carrinho.model";
import { Oferta } from "./shared/oferta.model";

class CarrinhoService{
    public itens: ItemCarrinho[] = []

    public getItens(): ItemCarrinho[]{
        return this.itens
    }

    public setItem(oferta: Oferta):void{
        let itemCarrinho: ItemCarrinho  = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )

        let itemCarrinhoEncontrado = this.itens.find((item:ItemCarrinho) => item.id === itemCarrinho.id)

        if(itemCarrinhoEncontrado)
        {
            itemCarrinhoEncontrado.quantidade++

        }else{
            this.itens.push(itemCarrinho);
        }
    }

    public totalCarrinho():number{
       
        let total:number = 0
       
        this.itens.map((item:ItemCarrinho) =>{
            total += (item.valor * item.quantidade)
        })

        return total;     
    }

    public adicionarQuantidade(item:ItemCarrinho):void {

       let itemCarrinho = this.itens.find((itemCarrinho:ItemCarrinho) => itemCarrinho.id == item.id)       

       if(itemCarrinho)
       {
           itemCarrinho.quantidade+=1
       }
       
    }

    public removerQuantidade(item:ItemCarrinho):void{

        let removerI = this.itens.find((possuiItem:ItemCarrinho) => item.id == possuiItem.id)
        
        if(removerI)
        {
            removerI.quantidade -=1

            if(removerI.quantidade == 0){
                this.itens.splice(this.itens.indexOf(item),1)  
            }   
        }
                
    }

    public limparCarrinho():void{
        this.itens = []
    }
    
}

export {CarrinhoService}