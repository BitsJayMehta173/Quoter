const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// @route   GET /api/notes
// @desc    Get all notes
// @access  Public
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ order: 1, createdAt: 1 });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/notes/:id
// @desc    Get single note by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/notes
// @desc    Create a new note
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { type, quoteText, quoteAuthor, articleTitle, articleExcerpt, articleContent, gradient } = req.body;

    // Validation
    if (!type || !['quote', 'article'].includes(type)) {
      return res.status(400).json({ message: 'Invalid note type' });
    }

    if (type === 'quote' && (!quoteText || !quoteAuthor)) {
      return res.status(400).json({ message: 'Quote text and author are required' });
    }

    if (type === 'article' && (!articleTitle || !articleExcerpt || !articleContent)) {
      return res.status(400).json({ message: 'Article title, excerpt, and content are required' });
    }

    // Get the highest order number and increment
    const lastNote = await Note.findOne().sort({ order: -1 });
    const newOrder = lastNote ? lastNote.order + 1 : 0;

    const note = new Note({
      type,
      quoteText,
      quoteAuthor,
      articleTitle,
      articleExcerpt,
      articleContent,
      gradient,
      order: newOrder,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { type, quoteText, quoteAuthor, articleTitle, articleExcerpt, articleContent, gradient, order } = req.body;

    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Update fields
    if (type) note.type = type;
    if (quoteText !== undefined) note.quoteText = quoteText;
    if (quoteAuthor !== undefined) note.quoteAuthor = quoteAuthor;
    if (articleTitle !== undefined) note.articleTitle = articleTitle;
    if (articleExcerpt !== undefined) note.articleExcerpt = articleExcerpt;
    if (articleContent !== undefined) note.articleContent = articleContent;
    if (gradient !== undefined) note.gradient = gradient;
    if (order !== undefined) note.order = order;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
