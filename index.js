import express from "express";
import authRoute from "./routes/authRoute.js"
import employeeRoute from "./routes/employeeRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use('/api/auth', authRoute)
app.use('/api/employee', employeeRoute)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})