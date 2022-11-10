import { useState, useEffect } from "react";
import axios from "axios";

const CountryProfile = ({ country }) => {
  const [weather, setWeather] = useState({});
  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);

  const lat = country.capitalInfo.latlng[0];
  const lng = country.capitalInfo.latlng[1];

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((response) => {
        const data = response.data;
        setWeather(data.weather[0]);
        setTemp(data.main.temp);
        setWind(data.wind.speed);
      });
  }, [lat, lng]);

  return (
    <div>
      <div>
        <h1>{country.name.official}</h1>
        <p>capital {country.capital[0]}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={`${country.name.official} flag`}
          width={200}
        />
      </div>
      <div>
        <h2>{`Weather in ${country.capital[0]}`}</h2>
        <p>temperature {temp} Celcius</p>
        {JSON.stringify(weather) === "{}" ? (
          ""
        ) : (
          <>
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              width={100}
            />
            <p>{weather.description}</p>
          </>
        )}
        <p>wind {wind} m/s</p>
      </div>
    </div>
  );
};

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
