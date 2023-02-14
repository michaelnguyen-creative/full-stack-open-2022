import AddEntryForm, { HealthCheckEntryFormValues } from './AddEntryForm'

import { Dialog, DialogTitle, DialogContent, Alert } from '@mui/material'

export type AddEntryModalProps = {
  addNewEntry: (entryValues: HealthCheckEntryFormValues) => void
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
        {error && <Alert severity="error" />}
        <AddEntryForm
          addNewEntry={addNewEntry}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AddEntryModal
