const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Dummy data for local therapists and events
router.get('/', auth, async (req, res) => {
  const resources = [
    { id: 1, name: "Downtown Therapist Clinic", address: "123 Main St", lat: 40.7128, lng: -74.0060 },
    { id: 2, name: "City Wellness Group", address: "456 Elm St", lat: 40.7138, lng: -74.0020 },
    { id: 3, name: "Weekly Meditation Meetup", address: "789 Oak Ave", lat: 40.7100, lng: -74.0100 }
  ];
  res.json(resources);
});

module.exports = router;
