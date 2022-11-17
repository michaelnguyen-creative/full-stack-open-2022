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
        <div className="input">
          name: <input onChange={addName} value={newName} />
        </div>
        <div className="input">
          number: <input onChange={addPhone} value={newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};
