export const Contact = ({ persons, deleteContact }) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number} <button id={person.id} onClick={deleteContact}>delete</button>
        </div>
      ))}
    </>
  );
};
