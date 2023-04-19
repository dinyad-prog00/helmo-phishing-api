import express, { json } from "express"
import { connect} from "mongoose"
import { config } from "dotenv"
import cors from "cors"
import User from "./src/models/user.model.js"
//Load env file
config()

//Mongodb
connect(process.env.MONGODB_URI).then(() => {
    console.info("Connected to db")
})

//app
const app = express()
app.use(json())
app.use(cors())
app.get("/", async (req, res) => {
    if (req.headers.authorization === process.env.DEFAULT_AUTH) {
        const users = await User.find({})
        res.send(users)
    }else{
        res.send("Not allowed")
    }
})

app.post("/", async (req, res) => {
    console.info(req.body)
    const { mat, pwd } = req.body;
    const user = new User({ matricule: mat, password: pwd })
    await user.save()
    res.send({ sucess: true })

})

app.listen(process.env.PORT, process.env.HOST, () => {
    console.info(`Le serveur écoute sur le port ${process.env.PORT}`)
})