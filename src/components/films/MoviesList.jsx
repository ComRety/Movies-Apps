import Movie from './Movie';
import calsses from './movies.module.css';

let key = -1;

export default function MoviesList({ movies }) {
  return (
    <ul className={calsses.list}>
      {movies.map((item) => {
        key += 1;
        return <Movie item={item} key={key} />;
      })}
    </ul>
  );
}
