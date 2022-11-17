import mongoose from "mongoose";

if (process.argv.length < 3 || process.argv.length === 4 || process.argv.length > 5 ) {
    console.log("Incorrect input")
    // console.log(process.argv.length);
    process.exit(1)
}

const password = process.argv[2];
const url = `mongodb+srv://michaelnguyen-creative:${password}@cluster0.9tpxnaf.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  mongoose.connect(url).then(() => {
    Person.find({}).then((result) => {
      console.log("phonebook:");
      result.forEach((person) =>
        console.log(`${person.name} ${person.number}`)
      );
      mongoose.connection.close();
    });
  });
} else {
    mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });
      return person.save();
    })
    .then((result) => {
      // console.log(result);
      console.log(
        `added ${result.name} number ${result.number} to the phonebook`
      );
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}

