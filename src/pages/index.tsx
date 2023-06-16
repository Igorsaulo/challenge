import { Box, Paper } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Table from './components/table/table'

const Home: NextPage = () => {
  const createProduto = api.produto.create.useMutation();
  const produtos = api.produto.getAll.useQuery();
  return (
    <>
      <Head>
        <title>Home</title>
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
          
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            width: '80%'
          }}
        >
          <Table
            produtos={produtos.data}

          />
        </Paper>
      </Box>
    </>
  );
};

export default Home;
