if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "../.env" });
  }
  

const express = require("express");
const cors = require("cors");

// create the all important app object
const app = express();
const path = require("path");
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

app.get("/", (req, res) => {
    return res.status(200).json("Backend Home")
})

app.get("/house-test", async (req, res) => {
    const house = await House.findOne({code: "abc"});
    res.status(200).json(house.code);
})

if (process.env.NODE_ENV !== "dev") {
    // Serve static files from the 'dist' directory
    app.use(express.static(path.join(__dirname, "../client/dist")));
  
    // Define a catch-all route to serve the main HTML file
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

app.listen(port, () => {
	console.log("Server running on port", port)
})