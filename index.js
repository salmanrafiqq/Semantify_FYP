import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import createHttpError from "http-errors";
import cookieParser from "cookie-parser";
import proposalRoute from './routes/proposal.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
};

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
dotenv.config();
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: "40mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "40mb", extended: true }));

const Port = process.env.PORT || 5000
    /* Routing */

app.use("/proposal", proposalRoute)
app.use("/auth", authRoute)
app.use('/user', userRoute)


app.use((req, res, next) => {
    next(createHttpError.NotFound())
})
app.use((error, req, res, next) => {
    error.status = error.status || 500;
    console.log(error)
    res.status(error.status)
    res.json({ error })
})

/* Connection to database */
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        console.log("mongodb connected"),
        app.listen(Port, () => { console.log(`backend running at : ${Port} `); })
    )
    .catch((err) => console.log(err))