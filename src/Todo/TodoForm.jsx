import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
// import { FindProductRequest } from './proto/todo_pb';
import { ProductSearchRequest } from './proto/search_pb';
import { searchClient } from './proto/search_grpc_web_pb';

export const TodoForm = ({ addTask }) => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState('');
  const [highlightedIndex, sethighlightedIndex] = useState(0);

  const handleChange = async e => {
    e.preventDefault();
    setInput(e.target.value);
    const updatedResults = await findProduct(e.target.value);
    sethighlightedIndex(0);
    setResults(updatedResults);
  };

  // useEffect(() => {
  //   return find(setData);
  // }, []);

  const client = new searchClient(
    'http://' + window.location.hostname + ':8080',
    null,
    null,
  );

  const findProduct = name => {
    return new Promise(resolve => {
      const request = new ProductSearchRequest();
      request.setName(name);

      client.productSearch(request, {}, (err, response) => {
        if (response === null || err) {
          return resolve([]);
        }
        resolve(response.toObject().resultsList.map(product => product));
      });
    });
  };

  // const findProduct = name => {
  //   return new Promise(resolve => {
  //     const request = new FindProductRequest();
  //     request.setName(name);

  //     client.findProduct(request, {}, (err, response) => {
  //       if (err) {
  //         console.log(err);
  //         return;
  //       }

  //       response = response.getProductsList().map(product => {
  //         return {
  //           value: product.getUuid(),
  //           label: product.getName(),
  //           indexes: product.getIndexesList().map(index => index.getIndex()),
  //         };
  //       });

  //       resolve(response);
  //     });
  //   });
  // };

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
          setInput(results[highlightedIndex + 1].label);
          sethighlightedIndex(highlightedIndex => highlightedIndex + 1);
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (highlightedIndex !== 0) {
          setInput(results[highlightedIndex - 1].label);
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
