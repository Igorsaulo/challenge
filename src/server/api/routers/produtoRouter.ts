import { ProdutoAdapter } from "../models/produto/produtos.adapter";
import * as yup from 'yup';
import { produtoSchema } from "~/lib/produtoschema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { produtoUpdateSchema } from "~/lib/produtoschema";


export const produtoRouter = createTRPCRouter({
  create: publicProcedure
    .input(produtoSchema)
    .mutation(async ({ input }) => {
      return await new ProdutoAdapter().createProduto(input);
    }
    ),
  getAll: publicProcedure
    .query(async () => {
      return await new ProdutoAdapter().getAllProdutos();
    }
  ),
  getById: publicProcedure
    .input(yup.number().required())
    .query(async ({ input }) => {
      return await new ProdutoAdapter().getProdutoById(input);
    }
  ),
  update: publicProcedure
    .input(yup.object().shape({
      id: yup.number().required(),
      produto: produtoUpdateSchema
    }))
    .mutation(async ({ input }) => {
      return await new ProdutoAdapter().updateProduto(input.id, input.produto);
    }
  ),
  delete: publicProcedure
    .input(yup.number().required())
    .mutation(async ({ input }) => {
      return await new ProdutoAdapter().deleteProduto(input);
    }
  ),
});