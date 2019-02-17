import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
// import { FindProductRequest } from './proto/todo_pb';
import { ProductSearchRequest } from './proto/search_pb';
import { searchClient } from './proto/search_grpc_web_pb';

export const TodoForm = ({ addTask }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [highlightedIndex, sethighlightedIndex] = useState(0);

  const handleChange = async e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  useEffect(() => {
    if (!input) return;
    let cancel;
    (async () => {
      try {
        let query;
        [query, cancel] = findProduct(input);
        const result = await query;
        setResults(result);
        sethighlightedIndex(0);
      } catch (error) {}
    })();
    return () => cancel();
  }, [input]);

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

  const onKeyPressed = e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setResults([]);
      sethighlightedIndex(0);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      handleSubmit(e, highlightedIndex);
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

  const handleSubmit = (e, index) => {
    e.preventDefault();
    if (results.length === 0) return;
    addTask(uuid(), results[index].name);
    setResults([]);
    setInput('');
    sethighlightedIndex(0);
  };

  return (
    <form onSubmit={e => handleSubmit(e, highlightedIndex)}>
      <input
        className="w-full bg-grey-light rounded-t p-2 text-black"
        placeholder="Add new task..."
        onChange={handleChange}
        onKeyDown={onKeyPressed}
        value={input}
        ref={input => input && input.focus()}
        tabIndex="0"
      />
      <ul className="list-reset">
        {results.map((result, index) => (
          <Result
            key={result.productUuid}
            result={result}
            index={index}
            handleSubmit={handleSubmit}
            highlightedIndex={highlightedIndex}
            sethighlightedIndex={sethighlightedIndex}
          />
        ))}
      </ul>
    </form>
  );
};

const Result = ({
  result,
  index,
  handleSubmit,
  highlightedIndex,
  sethighlightedIndex,
}) => {
  return (
    <li
      onMouseEnter={() => sethighlightedIndex(index)}
      onClick={e => handleSubmit(e, index)}
      className={'bg-grey-light p-2 font-bold cursor-default'}
      style={highlightedIndex === index ? { background: '#8795a1' } : {}}
    >
      {replaceAt(result.indexesList.map(index => index.index), result.name)}
    </li>
  );
};

const client = new searchClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);

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
