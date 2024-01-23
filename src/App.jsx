import { useState } from 'react';
import { Spin, Alert } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Offline, Online } from 'react-detect-offline';

import Search from './components/Search';
import MoviesList from './components/films/MoviesList';
import './app.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(1);

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
      setLoading(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setLoading(false);
          console.log(response);
          setMovies(response.results);
          setTotal(Number(response.total_results));
        })
        .catch((err) => setError(err));
    }
  };

  if (loading) {
    return (
      <>
        <Online>
          <div className="app">
            <Search request={request} />
            <Spin className="spin" />
          </div>
        </Online>
        <Offline>
          <div className="app">
            <Search request={request} />
            <Alert message="Отстутствует подключение к интернету" type="error" />
          </div>
        </Offline>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Online>
          <div className="app">
            <Search request={request} />
            <Alert message={error} type="error" />
          </div>
        </Online>
        <Offline>
          <div className="app">
            <Search request={request} />
            <Alert message="Отстутствует подключение к интернету" type="error" />
          </div>
        </Offline>
      </>
    );
  }

  if (total === 0) {
    return (
      <>
        <Online>
          <div className="app">
            <Search request={request} />
            <Alert message="Увы! Не удалось найти фильмы по данному запросу, попробуйте еще раз" type="warning" />
          </div>
        </Online>
        <Offline>
          <div className="app">
            <Search request={request} />
            <Alert message="Отстутствует подключение к интернету" type="error" />
          </div>
        </Offline>
      </>
    );
  }
  return (
    <>
      <Online>
        <div className="app">
          <Search request={request} />
          <MoviesList movies={movies} />
        </div>
      </Online>
      <Offline>
        <div className="app">
          <Search request={request} />
          <Alert message="Отстутствует подключение к интернету" type="error" />
        </div>
      </Offline>
    </>
  );
}
