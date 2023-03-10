const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const userRoute = require("./routes/user");


const app = express();


require('dotenv').config();

mongoose.connect(process.env.DB_URL)
.then(() => console.log("DB connected Successfully"))
.catch(err => console.log("Could not be connected to DB"));


app.use(express.json());
app.use("/api/users", userRoute);



const PORT = process.env.port || 3000;
app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));