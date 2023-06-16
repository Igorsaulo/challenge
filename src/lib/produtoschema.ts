import * as yup from 'yup';

export const produtoUpdateSchema = yup.object().shape({
  nome: yup.string().optional(),
  preco: yup.number().optional(),
  subtitulo: yup.string().optional(),
  descricao: yup.string().optional(),
});

export type ProdutoUpdateSchema = yup.InferType<typeof produtoUpdateSchema>;

export const produtoSchema = yup.object().shape({
  nome: yup.string().required(),
  preco: yup.number().required(),
  subtitulo: yup.string().required(),
  descricao: yup.string().required(),
});

export type ProdutoSchema = yup.InferType<typeof produtoSchema>;