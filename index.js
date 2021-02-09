const express = require('express');
const mongo = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const shortid = require("shortid");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
const BASE_URL = process.env.BASE_URL;
const DB_NAME = "urlshortener";

const urlSchema = new mongoose.Schema({
  longLink: { type: String, required: true },
  shortLink: { type: String },
  urlCode: { type: String },
  clickCount: { type: Number },
});

const Url = mongoose.model("Url", urlSchema);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startApplication = async () => {
  await mongoose.connect("mongodb://localhost:27017/links", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(
    "Successfully connected to MongoDB at: mongodb://localhost:27017/links"
  );
  await app.listen(PORT, () => {
    console.log(`[ index.js ] Listening on port ${PORT}`);
  });
};

startApplication();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/urlshortener', async (req, res, next) => {
  try {
    const data = await Url.find({});
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.post('/api/urlshortener', async (req, res, next) => {
  try {
    const { longLink } = req.body;
    const urlCode = shortid.generate();
    const shortLink = `${BASE_URL}/${urlCode}`;

    const input = { longLink, shortLink, urlCode, clickCount: 0 }
    res.json(await Url.create(input));
  } catch (error) {
    next(error);
  }
});