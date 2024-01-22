import { useState } from 'react';

import Search from './components/Search';
import MoviesList from './components/films/MoviesList';
import './app.css';

export default function App() {
  const [movies, setMovies] = useState([]);

  const request = (value) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDIzOTZmNGIwNzhkMjg4OWU2ZWUzYTQxODUwZWRkZSIsInN1YiI6IjY1YTQyYjA5N2Q1ZjRiMDBjMmI3ZmRhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7nY_exRhIjw9azUlCpqpdkN6ArNfIyFzetgsak6qTjQ',
      },
    };
    if (value.trim().length !== 0) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`,
        options
      )
        .then((response) => response.json())
        .then((response) => setMovies(response.results))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="app">
      <Search request={request} />
      <MoviesList movies={movies} />
    </div>
  );
}
