import { Tabs } from 'antd';

import MoviesList from './MoviesList';
import RatingFilms from './RatingFilms';

export default function Tab({ genre, movies, arrRating, request, addRating }) {
  const items = [
    {
      key: 'Search',
      label: 'Search',
      children: (
        <MoviesList addRating={addRating} movies={movies} genre={genre} arrRating={arrRating} request={request} />
      ),
    },
    {
      key: 'Rated',
      label: 'Rated',
      children: <RatingFilms arrRating={arrRating} genre={genre} addRating={addRating} />,
    },
  ];
  return <Tabs destroyInactiveTabPane="true" defaultActiveKey="Search" items={items} centered="true" />;
}
