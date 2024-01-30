import Movie from './Movie';
import classes from './movies.module.css';
import Search from './Search';

let key = -1;
let value;
export default function MoviesList({ genre, movies, request, addRating, arrRating }) {
  // const array = [{ rating: 4 }];
  return (
    <>
      <Search request={request} />
      <ul className={classes.list}>
        {movies.map((item) => {
          arrRating.forEach((i) => {
            if (item.id === i.id) {
              console.log(item.id, i.id);
              value = i.rating;
              console.log(value, i.rating);
            } else {
              value = 0;
            }
            return value;
          });
          key += 1;
          console.log(value);
          return <Movie addRating={addRating} value={value} item={item} key={key} genre={genre} />;
        })}
      </ul>
    </>
  );
}
