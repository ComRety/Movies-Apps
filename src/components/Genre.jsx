import classes from './movies.module.css';

export default function Genre({ children }) {
  return <div className={classes.genre}>{children}</div>;
}
