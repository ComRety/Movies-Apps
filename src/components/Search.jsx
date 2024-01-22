import { Tabs } from 'antd';
import { useRef } from 'react';

import classes from './search.module.css';

export default function Search({ request }) {
  const input = useRef();

  const items = [
    {
      key: 'Search',
      label: 'Search',
    },
    {
      key: 'Rated',
      label: 'Rated',
    },
  ];

  function addRequest(e) {
    e.preventDefault();
    request(input.current.value);
    input.current.value = '';
  }

  return (
    <div className={classes.search}>
      <Tabs defaultActiveKey="Search" items={items} centered="true" />
      <form onSubmit={addRequest}>
        <input ref={input} type="text" placeholder="Type to search..." id="input" className={classes.input} />
      </form>
    </div>
  );
}
