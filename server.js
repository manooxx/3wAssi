const express = require('express');
require("dotenv").config()
const cors = require('cors')
const connectDb = require('./config/db');
const authRouters = require('./routes/authRoutes')
const userRouters = require('./routes/userRoutes');



const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRouters);
app.use("/api", authRouters);



connectDb();
const PORT = process.env.PORT
app.listen(PORT, ()=>(
    console.log(`server is running ${PORT}`)
))


