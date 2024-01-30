import { format } from 'date-fns';
import { Rate } from 'antd';

import Genre from './Genre';
import classes from './movies.module.css';

export default function Rating({ item, genre, value, addRating }) {
  let key = -1;
  const listGenre = [];

  const colorBorder = (number) => {
    if (number <= 3) {
      return `${classes.red} ${classes.reting}`;
    }
    if (number > 3 && number <= 5) {
      return `${classes.orange} ${classes.reting}`;
    }
    if (number > 5 && number <= 7) {
      return `${classes.yellow} ${classes.reting}`;
    }
    return `${classes.green} ${classes.reting}`;
  };

  const reduction = (reduc) => {
    let items = 0;
    const array = [];
    const newReduc = reduc.split('');
    newReduc.forEach((i) => {
      if (items < 150) {
        items += i.length;
        array.push(i);
      }
    });
    array.push('...');
    return array.join('');
  };

  const genreList = () => {
    item.genre_ids.forEach((i) => {
      genre.forEach((gen) => {
        if (i === gen.id) {
          listGenre.push(gen.name);
        }
      });
    });
    return listGenre;
  };

  const rating = (number) => {
    addRating(item.id, number);
    console.log(number);
  };

  return (
    <li className={classes.block}>
      <div className={classes.imageBlock}>
        <img
          alt="Постер фильма"
          src={item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : ''}
          width={100}
          className={classes.image}
        />
      </div>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>{item.original_title}</h2>
          <div className={colorBorder(item.vote_average.toFixed(1))}>{Number(item.vote_average).toFixed(1)}</div>
        </div>
        <span className={classes.date}>
          {item.release_date ? format(new Date(item.release_date), 'MMMM dd, yyyy') : ''}
        </span>
        <div className={classes.listGenre}>
          {genreList().map((span) => {
            key += 1;
            return <Genre key={key}>{span}</Genre>;
          })}
        </div>
        <p className={classes.overview}>{reduction(item.overview)}</p>
        <Rate allowHalf count={10} value={value} onChange={rating} />
      </div>
    </li>
  );
}
