import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import authroutes from "./routes/authroutes.js";
import recruitroutes from "./routes/Recruitroutes.js"
import User from './routes/User.js'
import Employeeroutes from './routes/Employeeroutes.js'
import message from './routes/message.js'
import application from './routes/application.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hellow");
});
app.use("/api/v4/auth", authroutes);
app.use("/api/v4/recruiter",recruitroutes)
app.use('/api/users', User);
app.use('/api/jobs', Employeeroutes);
app.use('/api/jobs', application);
app.use('/api/messages', message);
connectDB();
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
