const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['quote', 'article'],
      required: true,
    },
    // Quote fields
    quoteText: {
      type: String,
      required: function() {
        return this.type === 'quote';
      },
    },
    quoteAuthor: {
      type: String,
      required: function() {
        return this.type === 'quote';
      },
    },
    // Article fields
    articleTitle: {
      type: String,
      required: function() {
        return this.type === 'article';
      },
    },
    articleExcerpt: {
      type: String,
      required: function() {
        return this.type === 'article';
      },
    },
    articleContent: {
      type: String,
      required: function() {
        return this.type === 'article';
      },
    },
    // Common fields
    gradient: {
      type: String,
      default: 'linear-gradient(135deg, #1db954 0%, #1ed760 100%)',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
