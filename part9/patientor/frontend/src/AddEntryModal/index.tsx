import AddEntryForm, { HealthCheckEntryFormValues } from "./AddEntryForm"

export type EntryModalProps = {
  addNewEntry: (entryValues: HealthCheckEntryFormValues) => void
}

const AddEntryModal = ({ addNewEntry }: EntryModalProps): JSX.Element => {
  return <AddEntryForm addNewEntry={addNewEntry} />
}

export default AddEntryModal