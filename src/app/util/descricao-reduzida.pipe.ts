import { PipeTransform,Pipe } from "@angular/core";

@Pipe({
    name:'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform{
    transform(descricao:string, trucar:number){
        if(descricao.length > trucar)
        {
            return descricao.substr(0,trucar) + "..."
        }

        return descricao
    }
}