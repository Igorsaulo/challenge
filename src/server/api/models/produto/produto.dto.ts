import { ProdutoInterface } from "./interface/produto.interface";

export class createProdutoDto implements ProdutoInterface {
  constructor(
    public nome: string, 
    public preco: number, 
    public descricao: string, 
    public subtitulo: string) 
    {}
}
