export const Filter = ({ persons, search, searchPeople }) => {
  return (
    <>
      <div>
        filter shown with <input onChange={searchPeople} />
      </div>
      {search === "" ? (
        <p>Please enter name to filter</p>
      ) : (
        persons
          .filter((person) => person.name.includes(search))
          .map((person) => (
            <div key={person.name}>
              {person.name} {person.number}
            </div>
          ))
      )}
    </>
  );
};
