import { useContext } from 'react';

// eslint-disable-next-line import/no-cycle
import { Context } from '../../App';
import Movie from '../movies/Movie';

import classes from './list.module.css';

export default function RatingFilms({ pageRating, arrRating, addRating }) {
  const genre = useContext(Context);
  const removeArray = arrRating.slice((pageRating - 1) * 6, pageRating * 6);

  return (
    <ul className={classes.list}>
      {removeArray.map((item) => (
        <Movie rating={item.rating} addRating={addRating} item={item} key={item.id} genre={genre} />
      ))}
    </ul>
  );
}
