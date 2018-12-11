import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FindProductRequest } from './proto/todo_pb';

export const TodoForm = ({ addTask, taskRef, client, setError }) => {
  const [results, setResults] = useState([]);
  const [value, setValue] = useState('');
  const [highlightedIndex, sethighlightedIndex] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    //if (!value) return;
    if (results !== undefined && results.length !== 0) {
      addTask(uuid(), results[highlightedIndex].label);
      setResults([]);
      setValue('');
    }
  };

  const handleChange = () => {
    const currentSearch = taskRef.current.value;
    const newSearch = currentSearch.replace(/[\u201C\u201D]/g, '"');
    setValue(currentSearch);
    findProduct(newSearch);
  };

  const findProduct = name => {
    const request = new FindProductRequest();
    request.setName(name);

    client.findProduct(request, {}, (err, response) => {
      if (err) {
        setError(true);
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
      return setResults(response);
    });
  };

  const onKeyPressed = e => {
    if (results !== undefined && results.length !== 0) {
      if (e.key === 'Escape') {
        setResults([]);
        sethighlightedIndex(0);
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        handleSubmit(e);
        sethighlightedIndex(0);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(e);
        sethighlightedIndex(0);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (highlightedIndex !== results.length - 1) {
          setValue(results[highlightedIndex + 1].label);
          sethighlightedIndex(highlightedIndex => highlightedIndex + 1);
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (highlightedIndex !== 0) {
          setValue(results[highlightedIndex - 1].label);
          sethighlightedIndex(highlightedIndex => highlightedIndex - 1);
        }
      }
    }
  };

  const handleHighlight = index => {
    if (highlightedIndex === index) {
      return 'bg-grey-dark p-2 font-bold cursor-pointer';
    } else {
      return 'bg-grey-light p-2 font-bold cursor-pointer';
    }
  };

  const handleMouseEnter = index => {
    sethighlightedIndex(index);
  };

  const handleSelect = e => {
    e.preventDefault();
    handleSubmit(e);
    sethighlightedIndex(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-full bg-grey-light rounded-t p-2"
        placeholder="Add new task..."
        onChange={handleChange}
        value={value}
        ref={taskRef}
        onKeyDown={onKeyPressed}
        tabIndex="0"
      />
      <ul className="list-reset">
        {results.map((result, index) => {
          return (
            <li
              onKeyDown={onKeyPressed}
              onMouseDown={handleSelect}
              onMouseEnter={() => handleMouseEnter(index)}
              key={result.value}
              className={handleHighlight(index)}
            >
              {replaceAt(result.label, result.indexes)}
            </li>
          );
        })}
      </ul>
    </form>
  );

  function replaceAt(string, indexArray) {
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
};

// {} for event only
// {() => (VALUE)} for other only
// {(e) => (e,VALUE)} for when event+other
