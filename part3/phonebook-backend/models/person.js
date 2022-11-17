import mongoose from "mongoose";

const url = "mongodb+srv://michaelnguyen-creative:210266@cluster0.9tpxnaf.mongodb.net/phonebookApp?retryWrites=true&w=majority"
console.log("connecting to", url);

mongoose.connect(url)
    .then(message => console.log("connected to MongoDB"))
    .catch(error => console.log(error.message))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
    transform: (doc, obj) => {
        obj.id = obj._id.toString(),
        delete obj._id,
        delete obj.__v
    }
})

export const Person = mongoose.model("Person", personSchema);

