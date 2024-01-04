              
const express = require('express');
const connectToDataBase = require('./mongoose');
const urlRoute = require('./routes/urlRouter');
const URL = require('./models/url');

const app = express();
const PORT = 5000;

connectToDataBase();    // Connect to MongoDB

app.use(express.json());         // JSON parsing middleware
app.use('/url', urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const data = await URL.findOneAndUpdate(     // Find and update URL document   
    { shortId },         // Match by shortId
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),       // Add timestamp to visit history
        },
      },
    }
  );
  if (data && data.redirectUrl) {
    res.redirect(data.redirectUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

