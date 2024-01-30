import Rating from './Rating';
import classes from './movies.module.css';

let key = -1;

export default function RatingFilms({ arrRating, genre, addRating }) {
  return (
    <ul className={classes.list}>
      {arrRating.map((item) => {
        key += 1;
        return <Rating value={item.rating} addRating={addRating} item={item} key={key} genre={genre} />;
      })}
    </ul>
  );
}
