import Movie from './Movie';
import classes from './movies.module.css';
import Search from './Search';

let key = -1;

export default function MoviesList({ genre, movies, request, addRating }) {
  return (
    <>
      <Search request={request} />
      <ul className={classes.list}>
        {movies.map((item) => {
          key += 1;
          return <Movie addRating={addRating} item={item} key={key} genre={genre} />;
        })}
      </ul>
    </>
  );
}
