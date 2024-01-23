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
  const [totalPages, setTotalPeges] = useState(1);
  const [current, setCurrent] = useState(1);
  const [value, setValue] = useState('');

  const request = (values, page) => {
    setValue(values);
    setCurrent(page);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDIzOTZmNGIwNzhkMjg4OWU2ZWUzYTQxODUwZWRkZSIsInN1YiI6IjY1YTQyYjA5N2Q1ZjRiMDBjMmI3ZmRhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7nY_exRhIjw9azUlCpqpdkN6ArNfIyFzetgsak6qTjQ',
      },
    };
    if (values.trim().length !== 0) {
      setLoading(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${values}&include_adult=false&language=en-US&page=${page}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          setLoading(false);
          setMovies(response.results);
          setTotal(Number(response.total_results));
          setTotalPeges(response.total_pages);
        })
        .catch((err) => setError(err));
    }
  };

  const onChange = (page) => {
    request(value, page);
    setCurrent(page);
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
          <MoviesList movies={movies} current={current} totalPages={totalPages} onChange={onChange} />
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
