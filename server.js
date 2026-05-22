const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const Quote = require("./models/Quote");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/quotesDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/quote", async (req, res) => {
    try {

        const response = await axios.get(
            "https://dummyjson.com/quotes/random"
        );

        const data = response.data;

        const newQuote = new Quote({
            content: data.quote,
            author: data.author
        });

        await newQuote.save();

        res.json(newQuote);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching quote"
        });
    }
});

app.get("/history", async (req, res) => {

    try {

        const quotes = await Quote.find()
            .sort({ createdAt: -1 });

        res.json(quotes);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching history"
        });
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});