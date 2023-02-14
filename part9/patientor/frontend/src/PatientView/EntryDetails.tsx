import {
  LocalHospitalRounded,
  WorkRounded,
  MedicalInformationRounded,
} from '@mui/icons-material'
import { Typography } from '@mui/material'

import { Entry } from "../types"

import BasicEntryBox from "./BasicEntryBox"

const assertNever = (value: never): never => {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`)
}

const renderEntryDetails = (entry: Entry) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <BasicEntryBox entry={entry} type={entry.type}>
          <LocalHospitalRounded />
        </BasicEntryBox>
      )
    case 'OccupationalHealthcare':
      return (
        <BasicEntryBox entry={entry} type={entry.type}>
          <Typography>
            <WorkRounded /> {entry.employerName}
          </Typography>
        </BasicEntryBox>
      )
    case 'HealthCheck':
      return (
        <BasicEntryBox entry={entry} type={entry.type}>
          <MedicalInformationRounded />
        </BasicEntryBox>
      )
    default:
      return assertNever(entry)
  }
}

export default {
  renderEntryDetails
}