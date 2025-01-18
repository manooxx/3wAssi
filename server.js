const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')
const connectDb = require('./config/db');
const authRouters = require('./routes/authRoutes')
const userRouters = require('./routes/userRoutes');


dotenv.config();

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


