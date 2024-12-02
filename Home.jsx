import React, { useState, useEffect } from 'react';
import api from '../api.jsx';
import { Heart, Trash2, Edit2, Check } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const { data } = await api.getMovies();
    setMovies(data);
  };

  const toggleWatchlist = async (movie) => {
    await api.updateMovie(movie.id, {
      ...movie,
      isWatchlisted: !movie.isWatchlisted
    });
    loadMovies();
  };

  const toggleWatched = async (movie) => {
    await api.updateMovie(movie.id, {
      ...movie,
      isWatched: !movie.isWatched
    });
    loadMovies();
  };

  const deleteMovie = async (id) => {
    await api.deleteMovie(id);
    loadMovies();
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.hero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.heroine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.director.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-12">
          <input
            type="text"
            placeholder="Search movies, actors, or directors..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-3">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="col">
            <div className="card h-100 shadow-sm">
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="card-img-top"
                style={{ 
                  height: '200px',
                  objectFit: 'cover',
                  objectPosition: 'top'
                }}
              />
              <div className="card-body p-2">
                <h6 className="card-title text-truncate mb-1" title={movie.title}>
                  {movie.title}
                </h6>
                <p className="card-text mb-1 small text-muted text-truncate" title={`Director: ${movie.director}`}>
                  Director: {movie.director}
                </p>
                <p className="card-text mb-1 small text-muted text-truncate" title={`Hero: ${movie.hero}`}>
                  Hero: {movie.hero}
                </p>
                <p className="card-text mb-1 small text-muted text-truncate" title={`Heroine: ${movie.heroine}`}>
                  Heroine: {movie.heroine}
                </p>
                <p className="card-text small text-muted mb-2" style={{ 
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  height: '2.4em'
                }}>
                  {movie.summary}
                </p>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      onClick={() => toggleWatchlist(movie)}
                      className={`btn btn-sm ${movie.isWatchlisted ? 'text-danger' : 'text-secondary'}`}
                    >
                      <Heart size={16} />
                    </button>
                    <button
                      onClick={() => toggleWatched(movie)}
                      className={`btn btn-sm ${movie.isWatched ? 'text-success' : 'text-secondary'}`}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => deleteMovie(movie.id)}
                      className="btn btn-sm text-secondary"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <small className="text-muted">
                    {movie.averageRating?.toFixed(1) || 'N/A'}/10
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;