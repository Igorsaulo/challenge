'use client';
import { useRouter } from "next/router";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { useTranslation } from "react-i18next";
import { NumericFormatCustom } from "../components/numberformat/numberformat";
import * as React from 'react';

interface State {
  numberformat: string;
}

export default function EditPage (){
  const [values, setValues] = React.useState<State>({});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const router = useRouter();
  const id = router.query.id;
  const produto = api.produto.getById.useQuery(Number(id));
  const updateProduto = api.produto.update.useMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<any>({});
  
  const onSubmit: SubmitHandler<any> = async (data) => {
    Object.keys(data).forEach(key => data[key] === '' && delete data[key]);
    if(data.preco){
      data.preco = data.preco.replace('R$', '')
      data.preco = data.preco.replace(',', '.')
      data.preco = Number(data.preco)
      data.preco = Number(data.preco);
    }
    Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
    console.log(data)
    await updateProduto.mutateAsync({id: Number(id),produto: data});
    router.push('/');
  }
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t("Editar")}</title>
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
            padding: '2rem',
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
              <Typography variant="h4" component="h2">
                {t("Editar Produto")}
              </Typography>
              <Typography marginBottom={"8px"} marginTop={'32px'} variant="h6" component="h2">
                {t("Nome Atual")} : {produto.data?.nome}
              </Typography>
              <TextField
                label={t("Novo Nome")}
                variant="outlined"
                fullWidth
                {...register("nome", { required: false })}
              />
              <Typography marginBottom={"8px"} marginTop={'16px'} variant="h6" component="h2">
                {t("Preço Atual")} : {produto.data?.preco}
              </Typography>
              <TextField
               label={t("Novo Preço")}
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
                {...register("preco", { required: false })}
              />
              <Typography marginBottom={"8px"} marginTop={'16px'} variant="h6" component="h2">
                {t("Subtitulo Atual")} : {produto.data?.subtitulo}
              </Typography>
              <TextField
                label={t("Novo Subtitulo")}
                variant="outlined"
                fullWidth
                {...register("subtitulo", { required: false })}
              />
              <Typography marginBottom={"8px"} marginTop={'16px'} variant="h6" component="h2">
                {t("Descrição Atual")} : {produto.data?.descricao}
              </Typography>
              <TextField
               label={t("Nova Descrição")}
                variant="outlined"
                fullWidth
                {...register("descricao", { required: false })}
              />
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
                {t("Atualizar")}
              </Button>
            </form>
          </Grid>
        </Paper>
      </Box>
    </>
  )

}
