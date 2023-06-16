import { Grid, List, ListItem } from "@mui/material"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export const Navbar = () => {
  const { t } = useTranslation()
  return (
    <Grid height={'5rem'} position={'fixed'} top={'0'} left={'50'} justifyContent={"center"} container>
      <List sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ListItem>
        <Link href="/create">
       {t('Criar')}
      </Link>
        </ListItem>
        <ListItem>
        <Link href="/">
        {t('Inicio')}
      </Link>
        </ListItem>
      </List>
    </Grid>
  )
}