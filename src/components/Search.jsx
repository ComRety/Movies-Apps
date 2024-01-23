import { Tabs } from 'antd';

import classes from './search.module.css';

export default function Search({ request }) {
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

  const debounce = (fn, ms) => {
    let timeout;
    return (...args) => {
      const fnCall = () => fn.apply(this, args);
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms);
    };
  };

  function addRequest(e) {
    e.preventDefault();
    request(e.target.value, 1);
    e.target.value = '';
  }

  const requestAdd = debounce(addRequest, 600);

  return (
    <div className={classes.search}>
      <Tabs defaultActiveKey="Search" items={items} centered="true" />
      <form onChange={requestAdd}>
        <input type="text" placeholder="Type to search..." id="input" className={classes.input} />
      </form>
    </div>
  );
}
