import { Card, CardContent, Typography} from '@mui/material'
import { Entry } from '../types'

type EntryProps = {
  entry: Entry
  children: JSX.Element
  type: string
}

const BasicEntryBox = ({ entry, children, type }: EntryProps) => {
  return (
    <Card
      sx={{
        backgroundColor:
          type === 'Hospital'
            ? 'secondary.light'
            : type === 'OccupationalHealthcare'
            ? 'info.light'
            : 'warning.light',
      }}
    >
      <CardContent>
        <Typography>{entry.date}</Typography>
        <Typography>{entry.description}</Typography>
        {children}
        <Typography>diagnosed by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  )
}

export default BasicEntryBox