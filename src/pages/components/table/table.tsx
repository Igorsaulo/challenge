import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { api } from '~/utils/api';
import { Button } from '@mui/material';

export default function TableProdutos(props : any) {
  const deleteProduto = api.produto.delete.useMutation();
  const [produtos,setProdutos] = React.useState()
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { t } = useTranslation()
  const delProdutoAction = async (id: number) => {
    await deleteProduto.mutateAsync(id);
    const produtoFilter = produtos.filter((produto: any) => produto.id !== id)
    setProdutos(produtoFilter)
  };
  React.useEffect(() => {
    setProdutos(props.produtos)
  },[props.produtos])
  return (
    <Paper 
    sx={{ 
      width: '100%', 
      overflow: 'hidden',
     }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                {t('Nome')}
              </TableCell>
              <TableCell>
                {t('Preço')}
              </TableCell>
              <TableCell>
                {t('Subtitulo')}
              </TableCell>
              <TableCell>
                {t('Descrição')}
              </TableCell>
              <TableCell>
                {t('Ações')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos?.map((produto: any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={produto.id}>
                  <TableCell>
                    <Link href={`/edit/${produto.id}`}>
                    {produto.nome}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {produto.preco} R$
                  </TableCell>
                  <TableCell>
                    {produto.subtitulo}
                  </TableCell>
                  <TableCell>
                    {produto.descricao}
                  </TableCell>
                  <TableCell>
                    <Link href={`/edit/${produto.id}`}>
                      <EditIcon />
                    </Link>
                    <Button  onClick={() => delProdutoAction(produto.id)}>
                      <DeleteIcon sx={{color:'black'}} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}