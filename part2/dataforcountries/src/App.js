import { useState, useEffect } from "react";
import axios from "axios";
import { CountryProfile } from "./components/CountryProfile";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setData(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const showCountry = (e) => {
    setSearch(e.target.id);
  };

  const countriesFound = data.filter((a) => a.name.official.includes(search));

  return (
    <div>
      <div>
        find countries <input type="text" onChange={handleChange} />
      </div>
      {search === "" ? (
        ""
      ) : countriesFound.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesFound.length === 1 ? (
        <CountryProfile country={countriesFound[0]} />
      ) : (
        countriesFound.map((b) => (
          <div key={b.name.official}>
            {b.name.official}{" "}
            <button id={b.name.official} onClick={showCountry}>
              show
            </button>
          </div>
        ))
      )}
    </div>
  );
};
export default App;
