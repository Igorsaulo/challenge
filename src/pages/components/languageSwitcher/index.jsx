import { useTranslation } from 'react-i18next'
import { Button, Grid } from '@mui/material'

const languageOptions = [
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'Português',
    value: 'ptBR',
  },
]

export const LanguageSwitcher = () => {
  const {t,i18n} = useTranslation()

  return (
    <Grid
    container
    position={'fixed'}
    top={0}
    >
      {languageOptions.map((option) => (
        <Button
        key={option.value}
        onClick={() => i18n.changeLanguage(option.value)
        }
        >
          {option.name}
        </Button>
      ))}
    </Grid>
  )
}
