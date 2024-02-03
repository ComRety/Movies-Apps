import classes from './genre.module.css';

export default function Genre({ children }) {
  return <div className={classes.genre}>{children}</div>;
}
