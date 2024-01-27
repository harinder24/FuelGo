import express from "express"
const app = express();

import mongoose from 'mongoose'
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const port = 3000; 
import {authRouter} from "./routes/auth.js";
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })


app.use("/auth/",authRouter);


app.listen(port, '0.0.0.0', () => {
  console.log(`Express server is running on port ${port}`);
});

