import React, { useState, useEffect } from 'react';
import api from '../api.jsx';
import { Star } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.css';

const FilterMovies = () => {
  const [movies, setMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const { data } = await api.getMovies();
    setMovies(data);
  };

  const filteredAndSortedMovies = () => {
    let filtered = movies.filter(movie => movie.averageRating >= minRating);

    return filtered.sort((a, b) => {
      if (sortBy === 'rating') {
        return sortOrder === 'desc'
          ? (b.averageRating || 0) - (a.averageRating || 0)
          : (a.averageRating || 0) - (b.averageRating || 0);
      } else {
        return sortOrder === 'desc'
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h4 mb-4">Filter Movies</h2>

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center">
                <label className="me-2">Minimum Rating:</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="form-select"
                >
                  {[...Array(11)].map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center">
                <label className="me-2">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                >
                  <option value="rating">Rating</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center">
                <label className="me-2">Order:</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="form-select"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-3">
            {filteredAndSortedMovies().map(movie => (
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
                    <div className="d-flex align-items-center">
                      <Star size={16} className="text-warning me-1" fill="currentColor" />
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
      </div>
    </div>
  );
};

export default FilterMovies;