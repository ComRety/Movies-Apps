import { Pagination } from 'antd';

import Movie from './Movie';
import calsses from './movies.module.css';

let key = -1;

export default function MoviesList({ movies, current, totalPages, onChange }) {
  return (
    <>
      <ul className={calsses.list}>
        {movies.map((item) => {
          key += 1;
          return <Movie item={item} key={key} />;
        })}
      </ul>
      <Pagination
        current={current}
        defaultCurrent={1}
        onChange={onChange}
        total={totalPages > 5 ? 50 : totalPages * 10}
      />
    </>
  );
}
