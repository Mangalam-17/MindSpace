const mongoose = require('mongoose');

const CreativeContentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contentType: { type: String, enum: ['poetry', 'art', 'music'], required: true },
  contentData: { type: String, required: true }, // Could be text or URL
  moodAtSubmission: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CreativeContent', CreativeContentSchema);
