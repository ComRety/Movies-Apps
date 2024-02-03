import { useContext } from 'react';

// eslint-disable-next-line import/no-cycle
import { Context } from '../../App';
import Movie from '../movies/Movie';
import Search from '../search/Search';

import classes from './list.module.css';

let p = 0;
export default function MoviesList({ movies, request, addRating, arrRating }) {
  const genre = useContext(Context);

  return (
    <>
      <Search request={request} />
      <ul className={classes.list}>
        {movies.map((item) => {
          p = 0;
          arrRating.forEach((i) => {
            if (i.id === item.id) {
              p = i.rating;
            }
          });
          return <Movie addRating={addRating} item={item} key={item.id} genre={genre} rating={p} />;
        })}
      </ul>
    </>
  );
}
