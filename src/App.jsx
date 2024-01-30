import { useState, useEffect } from 'react';
import { Spin, Alert, Pagination } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Online } from 'react-detect-offline';

import Offlines from './components/Offlines';
import Tab from './components/Tab';
import './app.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(1);
  const [totalPages, setTotalPeges] = useState(1);
  const [current, setCurrent] = useState(1);
  const [value, setValue] = useState('');
  const [genre, setGenre] = useState([]);
  const [guestId, setGuestId] = useState('');
  const [arrRating, setArrRatting] = useState([]);

  const genreRequest = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=6d2396f4b078d2889e6ee3a41850edde&language=en', options)
      .then((response) => response.json())
      .then((response) => {
        setGenre(response.genres);
      })
      .catch((err) => setError(err));
  };

  const guestSession = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDIzOTZmNGIwNzhkMjg4OWU2ZWUzYTQxODUwZWRkZSIsInN1YiI6IjY1YTQyYjA5N2Q1ZjRiMDBjMmI3ZmRhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7nY_exRhIjw9azUlCpqpdkN6ArNfIyFzetgsak6qTjQ',
      },
    };

    fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
      .then((response) => response.json())
      .then((response) => setGuestId(response.guest_session_id))
      .catch((err) => setError(err));
  };

  useEffect(() => {
    guestSession();
    genreRequest();
  }, []);

  const rating = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };

    fetch(
      `https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?api_key=6d2396f4b078d2889e6ee3a41850edde&language=en-US&page=1&sort_by=created_at.asc`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setArrRatting(response.results);
      })
      .catch((err) => setError(err));
  };

  const addRating = (movieRating, number) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{"value":${number}}`,
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieRating}/rating?api_key=6d2396f4b078d2889e6ee3a41850edde&guest_session_id=${guestId}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        rating();
      })
      .catch((err) => console.error(err));
  };

  const request = (values, page) => {
    setValue(values);
    console.log(value, values);
    setCurrent(page);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    if (values.trim().length !== 0) {
      setLoading(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=6d2396f4b078d2889e6ee3a41850edde&query=${values}&include_adult=false&language=en-US&page=${page}`,
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
            <Tab genre={genre} movies={movies} arrRating={arrRating} addRating={addRating} request={request} />
            <Spin className="spin" />
          </div>
        </Online>
        <Offlines />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Online>
          <div className="app">
            <Tab genre={genre} movies={movies} arrRating={arrRating} addRating={addRating} request={request} />
            <Alert message={error} type="error" />
          </div>
        </Online>
        <Offlines />
      </>
    );
  }

  if (total === 0) {
    return (
      <>
        <Online>
          <div className="app">
            <Tab genre={genre} movies={movies} arrRating={arrRating} addRating={addRating} request={request} />
            <Alert message="Не удалось найти фильмы по данному запросу, попробуйте еще раз" type="warning" />
          </div>
        </Online>
        <Offlines />
      </>
    );
  }

  return (
    <>
      <Online>
        <div className="app">
          <Tab genre={genre} movies={movies} arrRating={arrRating} addRating={addRating} request={request} />
          <Pagination
            className="pagination"
            current={current}
            defaultCurrent={1}
            onChange={onChange}
            total={totalPages > 5 ? 50 : totalPages * 10}
          />
        </div>
      </Online>
      <Offlines />
    </>
  );
}
