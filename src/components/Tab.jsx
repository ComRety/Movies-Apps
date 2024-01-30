import { Tabs, Pagination } from 'antd';

import MoviesList from './MoviesList';
import RatingFilms from './RatingFilms';

export default function Tab({ genre, movies, arrRating, request, addRating, current, onChange, totalPages }) {
  const items = [
    {
      key: 'Search',
      label: 'Search',
      children: (
        <>
          <MoviesList addRating={addRating} movies={movies} genre={genre} request={request} />
          <Pagination
            className="pagination"
            current={current}
            defaultCurrent={1}
            onChange={onChange}
            total={totalPages > 5 ? 50 : totalPages * 10}
          />
        </>
      ),
    },
    {
      key: 'Rated',
      label: 'Rated',
      children: <RatingFilms arrRating={arrRating} genre={genre} addRating={addRating} />,
    },
  ];
  return <Tabs defaultActiveKey="Search" items={items} centered="true" />;
}
