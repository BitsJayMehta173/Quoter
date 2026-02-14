import React, { useState, useEffect } from 'react';
import { noteAPI } from './services/api';
import './App.css';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [activeArticle, setActiveArticle] = useState(null);

  const [formData, setFormData] = useState({
    type: 'quote',
    quoteText: '',
    quoteAuthor: '',
    articleTitle: '',
    articleExcerpt: '',
    articleContent: '',
  });

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await noteAPI.getAllNotes();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      alert('Failed to load notes. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const colors = [
      'linear-gradient(135deg, #1db954 0%, #1ed760 100%)',
      'linear-gradient(135deg, #c850c0 0%, #ffcc70 100%)',
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    ];
    const randomGradient = colors[Math.floor(Math.random() * colors.length)];

    const noteData = {
      ...formData,
      gradient: randomGradient,
    };

    try {
      await noteAPI.createNote(noteData);
      await fetchNotes();
      setShowModal(false);
      setFormData({
        type: 'quote',
        quoteText: '',
        quoteAuthor: '',
        articleTitle: '',
        articleExcerpt: '',
        articleContent: '',
      });
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await noteAPI.deleteNote(id);
        await fetchNotes();
        if (currentSlide >= notes.length - 1) {
          setCurrentSlide(Math.max(0, notes.length - 2));
        }
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note. Please try again.');
      }
    }
  };

  // Touch/Mouse handlers
  const handleStart = (clientX) => {
    setStartX(clientX);
    setCurrentX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = currentX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (diff < 0 && currentSlide < notes.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }
  };

  const openArticle = (noteId) => {
    setActiveArticle(noteId);
  };

  const closeArticle = () => {
    setActiveArticle(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading notes...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>✨ My Notes</h1>
        </div>

        <div className="slider-container">
          <div
            className="slides-wrapper"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
          >
            {notes.length === 0 ? (
              <div className="slide empty-slide">
                <div className="slide-content">
                  <h2>No notes yet!</h2>
                  <p>Click the + button to create your first note</p>
                </div>
              </div>
            ) : (
              notes.map((note, index) => (
                <React.Fragment key={note._id}>
                  {note.type === 'quote' ? (
                    <div
                      className="slide quote-slide"
                      style={{ background: note.gradient }}
                    >
                      <div className="slide-indicator">
                        Quote {index + 1}/{notes.length}
                      </div>
                      <button
                        className="delete-note-btn"
                        onClick={() => handleDelete(note._id)}
                      >
                        ×
                      </button>
                      <div className="slide-content">
                        <div className="quote-text">"{note.quoteText}"</div>
                        <div className="quote-author">— {note.quoteAuthor}</div>
                      </div>
                      {index < notes.length - 1 && (
                        <div className="swipe-hint">
                          <span>Swipe</span>
                          <span className="swipe-icon">→</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {activeArticle !== note._id ? (
                        <div className="slide article-slide">
                          <div className="slide-indicator">
                            Article {index + 1}/{notes.length}
                          </div>
                          <button
                            className="delete-note-btn"
                            onClick={() => handleDelete(note._id)}
                          >
                            ×
                          </button>
                          <div
                            className="slide-content article-preview"
                            onClick={() => openArticle(note._id)}
                          >
                            <div className="article-title">{note.articleTitle}</div>
                            <div className="article-excerpt">{note.articleExcerpt}</div>
                            <button className="read-more">Read More</button>
                          </div>
                          {index < notes.length - 1 && (
                            <div className="swipe-hint">
                              <span>Swipe</span>
                              <span className="swipe-icon">→</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="slide article-full">
                          <h2>{note.articleTitle}</h2>
                          <p>{note.articleContent}</p>
                          <button className="back-button" onClick={closeArticle}>
                            ← Back to Slides
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </React.Fragment>
              ))
            )}
          </div>
        </div>

        {notes.length > 0 && (
          <div className="controls">
            {notes.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}
      </div>

      <button className="add-button" onClick={() => setShowModal(true)}>
        +
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal active">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Note</h2>
              <button className="close-modal" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="quote">Quote</option>
                  <option value="article">Article</option>
                </select>
              </div>

              {formData.type === 'quote' ? (
                <div className="form-group">
                  <label>Quote Text</label>
                  <textarea
                    name="quoteText"
                    value={formData.quoteText}
                    onChange={handleInputChange}
                    placeholder="Enter your quote..."
                    required
                  />
                  <label style={{ marginTop: '12px' }}>Author</label>
                  <input
                    type="text"
                    name="quoteAuthor"
                    value={formData.quoteAuthor}
                    onChange={handleInputChange}
                    placeholder="— Author name"
                    required
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label>Article Title</label>
                  <input
                    type="text"
                    name="articleTitle"
                    value={formData.articleTitle}
                    onChange={handleInputChange}
                    placeholder="Enter title..."
                    required
                  />
                  <label style={{ marginTop: '12px' }}>Excerpt</label>
                  <textarea
                    name="articleExcerpt"
                    value={formData.articleExcerpt}
                    onChange={handleInputChange}
                    placeholder="Brief preview..."
                    required
                  />
                  <label style={{ marginTop: '12px' }}>Full Content</label>
                  <textarea
                    name="articleContent"
                    value={formData.articleContent}
                    onChange={handleInputChange}
                    placeholder="Full article text..."
                    style={{ minHeight: '200px' }}
                    required
                  />
                </div>
              )}

              <button type="submit" className="save-button">
                Save Note
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
