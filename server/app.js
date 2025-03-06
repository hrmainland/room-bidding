if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "../.env" });
  }
  

const express = require("express");
const cors = require("cors");

// create the all important app object
const app = express();
const mongoose = require('mongoose');

const House = require("./models/house");

const dbUrl = process.env.DB_URL

async function main() {
    await mongoose.connect(dbUrl);
    console.log("Connection Open - Yay")
} 

main().catch(err => console.log(err));

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// begin listening on a port
const port = process.env.PORT || 3500;

app.listen(port, () => {
	console.log("Server running on port", port)
})

app.get("/", (req, res) => {
    res.status(200).json("Hello World")
})

app.get("/house-test", async (req, res) => {
    const house = await House.findOne({code: "abc"});
    res.status(200).json(house.code);
})