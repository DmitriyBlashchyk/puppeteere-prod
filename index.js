const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Используйте bodyParser.urlencoded() для парсинга данных формы (например, x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4002;

app.post("/scrape", async (req, res) => {
  const postData = req.body;
  const pdf = await scrapeLogic(postData, res)
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=test.pdf');
  res.send(pdf);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
