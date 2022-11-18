import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Person } from "./models/person.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

morgan.token("persons", (req) => JSON.stringify(req.body));

app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :persons")
);

app.use(cors());

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("<h1>Phonebook Backend</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/info", (req, res) => {
  Person.find({}).then((result) => {
    const count = result.length;
    const time = new Date();
    res.send(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((result) => {
      if (result !== null) {
        res.json(result);
      } else {
        res.status(404).send({ error: "id not found" });
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((err) => {
      next(err);
    });
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (body === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(err => next(err))
});

app.put("/api/persons", (req, res, next) => {
  const query = { name: req.body.name };
  Person.findOneAndUpdate(query, { number: req.body.number })
    .then((updatedPerson) => {
      if (updatedPerson !== null) {
        res.json(updatedPerson);
      } else {
        res.status(400).send({ error: "bad request" });
      }
    })
    .catch((err) => next(err));
});

// Unknown endpoint middleware
const unknownEndpoint = (req, res) => {
  // responds with JSON-formatted error message
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({error: err.message})
  }
  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server's running on port ${PORT}`);
});
