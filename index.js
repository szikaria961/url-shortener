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
  clickCount: { type: Number, default: 0 },
});

const Url = mongoose.model("Url", urlSchema);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

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

app.get('/', async (req, res, next) => {
  try {
    const data = await Url.find({});
    res.render('pages/index', { data });
  } catch (error) {
    next(error);
  }
});

app.get('/:urlCode', async (req, res, next) => {
    const { urlCode } = req.params;
    const record = await Url.findOne({ urlCode });

    if (!record) return res.sendStatus(404)

    record.clickCount++;
    await record.save()

    res.redirect(record.longLink);
});

app.post('/', async (req, res, next) => {
  try {
    const { longLink } = req.body;
    const urlCode = shortid.generate();
    const shortLink = `${BASE_URL}/${urlCode}`;

    const input = { longLink, shortLink, urlCode }
    await Url.create(input);
    const data = await Url.find({});
    res.render('pages/index', { data });
  } catch (error) {
    next(error);
  }
});
