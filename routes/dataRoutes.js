const express = require('express');
const router = express.Router();
const Data = require('../models/dataModel');
// Get all data
router.get('/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get a single data by ID
router.get('/data/:id', getData, (req, res) => {
  res.json(res.data);
});
// Add new data
router.post('/data', async (req, res) => {
  const newData = new Data(req.body);
  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Update the data by ID
router.patch('/data/:id', getData, async (req, res) => {
  if (req.body.intensity != null) {
    res.data.intensity = req.body.intensity;
  }
  if (req.body.likelihood != null) {
    res.data.likelihood = req.body.likelihood;
  }
  if (req.body.relevance != null) {
    res.data.relevance = req.body.relevance;
  }
  if (req.body.year != null) {
    res.data.year = req.body.year;
  }
  if (req.body.country != null) {
    res.data.country = req.body.country;
  }
  if (req.body.topics != null) {
    res.data.topics = req.body.topics;
  }
  if (req.body.region != null) {
    res.data.region = req.body.region;
  }
  if (req.body.city != null) {
    res.data.city = req.body.city;
  }
  try {
    const updatedData = await res.data.save();
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Delete a data by ID
router.delete('/data/:id', getData, async (req, res) => {
  try {
    await res.data.remove();
    res.json({ message: 'Data deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Middleware to get a single data by ID
async function getData(req, res, next) {
  let data;
  try {
    data = await Data.findById(req.params.id);
    if (data == null) {
      return res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.data = data;
  next();
}
module.exports = router;