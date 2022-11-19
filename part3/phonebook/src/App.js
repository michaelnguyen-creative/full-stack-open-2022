import { useState, useEffect } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Contact } from "./components/Contact";
import { Notification } from "./components/Notification"
import { contactService } from "./services/contactService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("")

  useEffect(() => {
    // console.log(contactService);
    contactService.getAll().then((initialContact) => {
      // console.log(initialContact);
      setPersons(initialContact);
    });
  }, []);

  const addToPersons = (e) => {
    e.preventDefault();
    const newContact = { name: newName, number: newPhone };

    const checkExistedContact = (contactObj) => {
      return persons.find(
        (p) => p.name === contactObj.name || p.number === contactObj.number
      );
    };

    const updateContact = () => {
      const idToUpdate = checkExistedContact(newContact).id;
      // console.log(idToUpdate)
      contactService
        .update(idToUpdate, newContact)
        .then((returnedContact) => {
          setPersons(
            persons.map((p) => (p.id !== idToUpdate ? p : returnedContact))
          )
          setNewName("");
          setNewPhone("");
        })
        .catch(err => {
          setStatus(`${newContact.name} has already been deleted`)
          setTimeout(() => setStatus(""), 3000)
        })
    };

    const createContact = () => {
      contactService.create(newContact)
        .then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setNewName("");
        setNewPhone("");

        setStatus(`Added ${returnedContact.name}`)
        setTimeout(() => setStatus(""), 3000)
      })
        .catch(err => {
          console.log(err);
          setStatus(`${err.response.data.error}`)
          setTimeout(() => setStatus(""), 3000)
        })
    }

    return checkExistedContact(newContact) !== undefined
      ? window.confirm(
          `${newName} is already added to phonebook. Would you like to replace the old one?`
        )
        ? updateContact()
        : (setNewName(""), setNewPhone(""))
      : createContact()
  };

  const deleteContact = (e) => {
    if (window.confirm("Are you sure to delete this contact?")) {
      contactService.remove(e.target.id)
      contactService.getAll().then(returnedContact => {
        setPersons(returnedContact);
      });
    }
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
    <div className="app">
      <h2>Phonebook</h2>
      <Notification status={status} />
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
      <Contact persons={persons} deleteContact={deleteContact} />
    </div>
  );
};
export default App;
