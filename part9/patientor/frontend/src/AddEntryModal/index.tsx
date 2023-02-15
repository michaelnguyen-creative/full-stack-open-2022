import EntryFormControl, { EntryFormValues } from './BaseEntryForm'

import { Dialog, DialogTitle, DialogContent, Alert } from '@mui/material'
import { EntryWithoutId } from '../types'

export type AddEntryModalProps = {
  addNewEntry: (entryValues: EntryWithoutId) => void
  dialogIsOpen: boolean
  closeDialog: () => void
  error?: string
}

const AddEntryModal = ({
  addNewEntry,
  dialogIsOpen,
  closeDialog,
  error
}: AddEntryModalProps): JSX.Element => {
  return (
    <Dialog open={dialogIsOpen}>
      <DialogTitle>Add Entry</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <EntryFormControl
          addNewEntry={addNewEntry}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AddEntryModal
