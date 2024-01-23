import { format } from 'date-fns';
import { Rate } from 'antd';

import classes from './movies.module.css';

export default function Movie({ item }) {
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
          <div className={classes.reting}>{Number(item.vote_average).toFixed(1)}</div>
        </div>
        <span className={classes.date}>
          {item.release_date ? format(new Date(item.release_date), 'MMMM dd, yyyy') : ''}
        </span>
        <div className={classes.listGenre}>
          <span className={classes.genre}>Action</span>
          <span className={classes.genre}>Drama</span>
        </div>
        <p className={classes.overview}>{item.overview}</p>
        <Rate allowHalf defaultValue={0} />
      </div>
    </li>
  );
}
