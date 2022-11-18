import dotenv from "dotenv"
import mongoose from "mongoose";

if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: './.env'})
}

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(message => console.log("connected to MongoDB"))
    .catch(error => console.log(error.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
},
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

