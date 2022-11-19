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
  number: {
    type: String,
    minLength: 8,
    validate: {
        validator: value => {
            return /^\d{2,3}-\d+/.test(value)
        },
        message: props => `${props.value} is not a valid phone number`
    }
},
});

personSchema.set("toJSON", {
    transform: (doc, obj) => {
        obj.id = obj._id.toString(),
        delete obj._id,
        delete obj.__v
    }
})

export const Person = mongoose.model("Person", personSchema);

