import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import authroutes from "./routes/authroutes.js";
import recruitroutes from "./routes/Recruitroutes.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hellow");
});
app.use("/api/v4/auth", authroutes);
app.use("/api/v4/recruiter",recruitroutes)
connectDB();
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
