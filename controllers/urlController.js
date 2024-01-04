const shortid = require('shortid');
const URL = require('../models/url'); 


// Function to handle generating a new short URL

async function handleGenerateNewShortUrl(req, res) {
  try {
    const mainUrl = req.body;    // Extract the main URL from the request body
    if (!mainUrl.url) return res.status(400).json({ error: 'URL is required' });

    const shortId = shortid.generate(); // Generate the short ID
    await URL.create({
      shortId: shortId,
      redirectUrl: mainUrl.url,
      visitHistory: [],
    });
    return res.json({ id: shortId });    // Respond with the generated short ID
  } catch (error) {
    console.error(`Error creating shortened URL: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
}

// Function to handle fetching analytics for a specific short URL

async function handleAnalytics (req,res){
  const shortId = req.params.shortId;
  const data = await URL.findOne({ shortId });
  return res.json({
    totalClicks: data.visitHistory.length,
    analytics: data.visitHistory,
  });
}


module.exports = { handleGenerateNewShortUrl,handleAnalytics };
