const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//Routers
const userRoute = require("./Routes/user");
const authRoute = require("./Routes/auth");
const app = express();
dotenv.config();

const portNumber = process.env.PORT || 5000;
app.listen(portNumber, () => console.log(`Listening on port ${portNumber}...`));

mongoose
  .connect(
    `mongodb+srv://pasterma:${process.env.MONGO_PASS}@myfirstcluster.2gc2n.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
