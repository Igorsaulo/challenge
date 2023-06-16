export interface ProdutoInterface {
  nome: string;
  preco: number;
  descricao: string;
  subtitulo: string; 
}

export interface ProdutoUpdateInterface {
  nome?: string;
  preco?: number;
  descricao?: string;
  subtitulo?: string;
}