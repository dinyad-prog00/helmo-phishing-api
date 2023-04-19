
import { Schema, model } from "mongoose"


const userSchema = Schema({
    matricule: String,
    password: String
})

const User = model("User", userSchema)

export default User;