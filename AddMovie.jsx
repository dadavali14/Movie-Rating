import React, { useState } from 'react';
import api from '../api.jsx';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const AddMovie = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '',
    poster: '',
    hero: '',
    heroine: '',
    director: '',
    summary: '',
    ratings: [],
    averageRating: 0,
    isWatchlisted: false,
    isWatched: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.addMovie(movie);
    navigate('/');
  };

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add New Movie</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Movie Title</label>
                  <input
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-8">
                    <label className="form-label">Poster URL</label>
                    <input
                      type="url"
                      name="poster"
                      value={movie.poster}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  {movie.poster && (
                    <div className="col-md-4">
                      <img 
                        src={movie.poster} 
                        alt="Movie poster preview" 
                        className="img-fluid mt-2"
                        style={{ maxHeight: '150px', objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Hero</label>
                    <input
                      type="text"
                      name="hero"
                      value={movie.hero}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Heroine</label>
                    <input
                      type="text"
                      name="heroine"
                      value={movie.heroine}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Director</label>
                    <input
                      type="text"
                      name="director"
                      value={movie.director}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Summary</label>
                  <textarea
                    name="summary"
                    value={movie.summary}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    required
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Add Movie
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;