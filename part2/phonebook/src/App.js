import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");

  useEffect((() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("response fulfilled");
        setPersons(response.data)
      })
  }), [])

  const addToPersons = (e) => {
    e.preventDefault();
    return persons.some(
      (person) => person.name === newName || person.phone === newPhone
    )
      ? alert(`${newName} is already added to phonebook`)
      : newName !== "" && newPhone !== ""
      ? (setPersons(persons.concat({ name: newName, phone: newPhone })),
        setNewName(""),
        setNewPhone(""))
      : alert("Please enter both name and phone number");
  };

  const addName = (e) => {
    setNewName(e.target.value);
  };

  const addPhone = (e) => {
    setNewPhone(e.target.value);
  };

  const searchPeople = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} search={search} searchPeople={searchPeople} />
      <h2>Add a new</h2>
      <PersonForm
        addToPersons={addToPersons}
        addName={addName}
        newName={newName}
        addPhone={addPhone}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};
export default App;
