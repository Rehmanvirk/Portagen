const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  personalInfo: {
    fullName: String,
    title: String,
    about: String,
    profilePicture: String,
    contact: {
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      website: String,
    },
  },
  education: [
    {
      degree: String,
      institution: String,
      startYear: String,
      endYear: String,
    },
  ],
  experience: [
    {
      role: String,
      company: String,
      startDate: String,
      endDate: String,
      description: String,
    },
  ],
  projects: [
    {
      name: String,
      description: String,
      link: String,
    },
  ],
  skills: [String],
  isPublic: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);