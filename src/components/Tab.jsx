/* eslint-disable import/no-cycle */
import { Tabs, Pagination } from 'antd';

import RatingFilms from './list/RatingFilms';
import MoviesList from './list/MoviesList';

export default function Tab({
  pageRating,
  movies,
  arrRating,
  request,
  addRating,
  current,
  onChange,
  totalPages,
  rating,
  changePage,
}) {
  const rat = (array) => {
    const i = Math.ceil(array / 6);
    return i * 10;
  };
  const items = [
    {
      key: 'Search',
      label: 'Search',
      children: (
        <>
          <MoviesList addRating={addRating} arrRating={arrRating} movies={movies} request={request} />
          <Pagination
            className="pagination"
            current={current}
            defaultCurrent={1}
            onChange={onChange}
            total={totalPages * 10}
          />
        </>
      ),
    },
    {
      key: 'Rated',
      label: 'Rated',
      children: (
        <>
          <RatingFilms arrRating={arrRating} addRating={addRating} pageRating={pageRating} />
          <Pagination defaultCurrent={1} total={rat(arrRating.length)} className="pagination" onChange={changePage} />
        </>
      ),
    },
  ];
  return <Tabs defaultActiveKey="Search" items={items} centered="true" onChange={rating} />;
}
