import express from "express"
import morgan from "morgan"
import cors from "cors"

const app = express()

app.use(express.json())

app.use(cors())

app.use(express.static("build"))

morgan.token("persons", (req) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] :response-time ms :persons"))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send("<h1>Phonebook Backend</h1>")
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/info', (req, res) => {
  const count = persons.length
  const time = new Date()
  res.send(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 100)
}

app.post('/api/persons', (req, res) => {
  const existedName = persons.find(p => p.name === req.body.name)
  // console.log(req.body);
  if (req.body.name === "") {
    res.status(400).send({ error: "missing name"})
  } else if (req.body.number === "") {
    res.status(400).send({ error: "missing phone number"})
  } else if (existedName !== undefined) {
    res.status(400).send({ error: "name must be unique"})
  } else {
    const newPerson = {
      id: generateId(),
      name: req.body.name,
      number: req.body.number
    }
    persons = persons.concat(newPerson)
  
    res.json(newPerson)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server's running on port ${PORT}`);
})