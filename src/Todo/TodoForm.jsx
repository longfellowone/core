import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FindProductRequest } from './proto/todo_pb';

export const TodoForm = ({ addTask, client }) => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState('');
  const [highlightedIndex, sethighlightedIndex] = useState(0);

  const handleChange = async e => {
    e.preventDefault();
    const currentSearch = e.target.value;
    const newSearch = currentSearch.replace(/[\u201C\u201D]/g, '"');
    const updatedResults = await findProduct(newSearch);
    setInput(currentSearch);
    sethighlightedIndex(0);
    setResults(updatedResults);
  };

  const findProduct = name => {
    return new Promise(resolve => {
      const request = new FindProductRequest();
      request.setName(name);

      client.findProduct(request, {}, (err, response) => {
        if (err) {
          console.log(err);
          return;
        }

        response = response.getProductsList().map(product => {
          return {
            value: product.getUuid(),
            label: product.getName(),
            indexes: product.getIndexesList().map(index => index.getIndex()),
          };
        });

        resolve(response);
      });
    });
  };

  const onKeyPressed = e => {
    if (e.key === 'Escape') {
      setResults([]);
      sethighlightedIndex(0);
    }
    if (e.key === 'Tab') {
      handleSubmit(e, highlightedIndex);
    }
    if (results.length > 0) {
      if (e.key === 'ArrowDown') {
        if (highlightedIndex !== results.length - 1) {
          setInput(results[highlightedIndex + 1].label);
          sethighlightedIndex(highlightedIndex => highlightedIndex + 1);
        }
      }
      if (e.key === 'ArrowUp') {
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

    addTask(uuid(), results[index].label);
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
            key={result.value}
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
      1{replaceAt(result.indexes, result.label)}
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
