import { PrismaClient } from "@prisma/client";
import { ProdutoInterface, ProdutoUpdateInterface } from "./interface/produto.interface";

export class ProdutoAdapter {
  private db: PrismaClient;
  constructor() {
    this.db = new PrismaClient();
  }

  async createProduto(produto: ProdutoInterface) {
    try{
      const produtoCriado = await this.db.produtos.create({
        data: {
          nome: produto.nome,
          preco: produto.preco,
          descricao: produto.descricao,
          subtitulo: produto.subtitulo,
          }
        });
      this.db.$disconnect();
      return produtoCriado;
    }catch(e){
      console.log(e)
    }
  }
  async getAllProdutos() {
    try{
      const produtos = await this.db.produtos.findMany();
      this.db.$disconnect();
      return produtos;
    }catch(e){
      console.log(e)
    }
  }
  async getProdutoById(id: number) {
    try{
      const produto = await this.db.produtos.findUnique({
        where: {
          id: id,
        },
      });
      this.db.$disconnect();
      return produto;
    }catch(e){
      console.log(e)
    }
  }
  async updateProduto(id: number, produto: ProdutoUpdateInterface) {
    try{
       const produtoAtualizado = await this.db.produtos.update({
        where: {
          id: id,
        },
        data: produto,
      });
      this.db.$disconnect();
      return produtoAtualizado;
    }catch(e){
      console.log(e)
    }
  }
  async deleteProduto(id: number) {
    try{
      const produtoDeletado = await this.db.produtos.delete({
        where: {
          id: id,
        },
      });
      this.db.$disconnect();
      return produtoDeletado;
    }catch(e){
      console.log(e)
    }
  }
}