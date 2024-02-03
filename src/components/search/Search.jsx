import classes from './search.module.css';

export default function Search({ request }) {
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

  const requestAdd = debounce(addRequest, 1000);

  return (
    <div className={classes.search}>
      <form onChange={requestAdd}>
        <input type="text" placeholder="Type to search..." id="input" className={classes.input} />
      </form>
    </div>
  );
}
