import React, { useState, useEffect, useReducer } from 'react';
import { ProductSearchRequest } from './proto/search_pb';
import { searchClient } from './proto/search_grpc_web_pb';

export const TodoForm = ({ addTask }) => {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 30);
  const [results, setResults] = useState([]);
  const [highlightedIndex, sethighlightedIndex] = useState(0);
  const initialState = { input: '', results: [], highlightedIndex: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!debouncedInput) return;
    let cancel;
    (async () => {
      try {
        let query;
        [query, cancel] = findProduct(debouncedInput);
        const result = await query;
        setResults(result);
        sethighlightedIndex(0);
      } catch (error) {}
    })();
    return () => cancel();
  }, [debouncedInput]);

  const onKeyPressed = e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setResults([]);
      sethighlightedIndex(0);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      Submit(e, highlightedIndex);
    }
    if (results.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (highlightedIndex !== results.length - 1) {
          sethighlightedIndex(highlightedIndex => highlightedIndex + 1);
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (highlightedIndex !== 0) {
          sethighlightedIndex(highlightedIndex => highlightedIndex - 1);
        }
      }
    }
  };

  function handleOnClick(index) {
    // Check for duplicate UUID's
    if (results.length === 0) return;
    addTask(results[index].productUuid, results[index].name);
    setResults([]);
    setInput('');
    sethighlightedIndex(0);
    return;
  }

  function Submit(e, index) {
    e.preventDefault();
    handleOnClick(index);
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'add':
        handleOnClick(action.index);
        return;
      default:
        return state;
    }
  }

  const resultsList = results.map((result, index) => (
    <Result
      key={result.productUuid}
      result={result}
      index={index}
      dispatch={dispatch}
      highlightedIndex={highlightedIndex}
      sethighlightedIndex={sethighlightedIndex}
    />
  ));

  const handleChange = e => {
    e.preventDefault();
    setInput(e.target.value);
    if (e.target.value === '') {
      setResults([]);
    }
  };

  const focusInput = input => input && input.focus();
  const handleOnSumbit = e => Submit(e, highlightedIndex);

  return (
    <>
      <form onSubmit={handleOnSumbit}>
        <input
          className="w-full bg-grey-light rounded-t p-2 text-black"
          placeholder="Add new task..."
          onChange={handleChange}
          onKeyDown={onKeyPressed}
          value={input}
          ref={focusInput}
          tabIndex="0"
        />
      </form>
      <ul className="list-reset bg-grey-light font-bold cursor-default">
        {resultsList}
      </ul>
    </>
  );
};

const Result = React.memo(
  ({ result, index, dispatch, highlightedIndex, sethighlightedIndex }) => {
    const handleOnClick = () => dispatch({ type: 'add', index: index });
    const handleOnMouseEnter = () => sethighlightedIndex(index);
    const indexes = result.indexesList.map(index => index.index);
    const item = replaceAt(indexes, result.name);

    return (
      <li
        className="p-2"
        style={highlightedIndex === index ? { background: '#8795a1' } : {}}
        onMouseEnter={handleOnMouseEnter}
        onClick={handleOnClick}
      >
        {item}
      </li>
    );
  },
);

const client = new searchClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);

const findProduct = name => {
  let status;
  const query = new Promise(resolve => {
    const request = new ProductSearchRequest();
    request.setName(name);

    const response = (err, response) => {
      if (response === null || err) {
        return resolve([]);
      }
      resolve(response.toObject().resultsList.map(product => product));
    };

    status = client.productSearch(request, {}, response);
  });
  return [query, () => status.cancel()];
};

function replaceAt(indexArray, string) {
  let newString = [...string];

  for (let i = 0; i < indexArray.length; i++) {
    newString = Object.assign(newString, {
      [indexArray[i]]: (
        <span className="font-normal" key={i}>
          {newString[indexArray[i]]}
        </span>
      ),
    });
  }
  return newString;
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
