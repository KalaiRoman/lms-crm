import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from "helmet";
import bodyparser from 'body-parser';
import { errorMiddleware, notFound } from './middleware/errorMiddleware.js';
import ConnectDb from './middleware/Dbconnect.js';
import router from './Routing/Routing.js';
dotenv.config();
ConnectDb();
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"]
}))
app.use(helmet());
app.use(bodyparser.json());
app.use(morgan(`dev`));
// routing apis
app.use("/cdp/crm", router);

// middleware
app.use(notFound);
app.use(errorMiddleware)
app.listen(process.env.PORT, () => {
    console.log(`Server Runing Port : ${process.env.PORT}`)
})

