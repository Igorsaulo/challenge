'use client';
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProdutoSchema,produtoSchema } from "~/lib/produtoschema";
import { api } from "~/utils/api";
import { useTranslation } from "react-i18next";
import  Router  from "next/router";
import { NumericFormatCustom } from "../components/numberformat/numberformat";
import * as React from 'react';

interface State {
  numberformat: string;
}

const Home: NextPage = () => {
  const createProduto = api.produto.create.useMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<ProdutoSchema>();
  const onSubmit: SubmitHandler<ProdutoSchema> = async (data) => {
    data.preco = data.preco.replace('R$', '')
    data.preco = data.preco.replace(',', '.')
    data.preco = Number(data.preco)
    data.preco = Number(data.preco);
    const produto = await createProduto.mutateAsync(data);
    Router.push('/');
  };
  const produtos = api.produto.getAll.useQuery();
  const { t } = useTranslation()

  const [values, setValues] = React.useState<State>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>{t("Criar")}</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: '5rem',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            width: '40%'
          }}
        >
          <Grid justifyContent={'center'} container>
            <form
              style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                label={t("Nome")}
                variant="outlined"
                fullWidth
                {...register("nome", { required: true })}
              />
              {errors.nome && <span style={{ color: 'red' }}>{t("Campo obrigatório")}</span>}
              <TextField
                label={t("Preço")}
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
                {...register("preco", { required: true })}
                sx={{ marginTop: '1rem' }}
              />
              {errors.preco && <span style={{ color: 'red' }}>{t("Campo obrigatório")}</span>}
              <TextField
                label={t("Subtitulo")}
                variant="outlined"
                fullWidth
                {...register("subtitulo", { required: true })}
                sx={{ marginTop: '1rem' }}
              />
              {errors.subtitulo && <span style={{ color: 'red' }}>{t("Campo obrigatório")}</span>}
              <TextField
                label={t("Descrição")}
                variant="outlined"
                fullWidth
                {...register("descricao", { required: true })}
                sx={{ marginTop: '1rem' }}
              />
              {errors.descricao && <span style={{ color: 'red' }}>{t("Campo obrigatório")}</span>}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  marginTop: '1rem',
                  display: 'block',
                  backgroundColor: '#0A55F7 !important',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#073FB8 !important',
                  }

                }}
              >
                {t("Criar")}
              </Button>
            </form>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Home;
