const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/numbers", async (req, res) => {
  try {
    if (!req.query.url) {
      res.status(400).json({ error: 'Missing "url" query parameter' });
      return;
    }

    const urls = Array.isArray(req.query.url) ? req.query.url : [req.query.url];

    const responses = await Promise.all(urls.map((url) => axios.get(url)));

    const numbers = responses.flatMap((response) => response.data.numbers);

    const uniqueNumbers = [...new Set(numbers)];

    const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);

    const result = { numbers: sortedNumbers };

    res.send(result);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

module.exports = router;
