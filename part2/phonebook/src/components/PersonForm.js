export const PersonForm = ({
  addToPersons,
  addName,
  newName,
  addPhone,
  newPhone,
}) => {
  return (
    <>
      <form onSubmit={addToPersons}>
        <div>
          name: <input onChange={addName} value={newName} />
        </div>
        <div>
          number: <input onChange={addPhone} value={newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};
