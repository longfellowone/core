import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { FindProductRequest } from './proto/todo_pb';

export const TodoForm = ({ addTask, client }) => {
  const [results, setResults] = useState([
    { value: 'test1', label: 'test1', indexes: [0, 1, 2, 3, 4] },
    { value: 'test2', label: 'test2', indexes: [0, 1, 2, 3, 4] },
    { value: 'test3', label: 'test3', indexes: [0, 1, 2, 3, 4] },
    { value: 'test4', label: 'test4', indexes: [0, 1, 2, 3, 4] },
  ]);
  const [input, setInput] = useState('');
  const [highlightedIndex, sethighlightedIndex] = useState(0);

  console.log('render');

  const handleChange = async e => {
    e.preventDefault();
    // const currentSearch = e.target.value;
    // const newSearch = currentSearch.replace(/[\u201C\u201D]/g, '"');
    // const updatedResults = await findProduct(newSearch);
    // setInput(currentSearch);
    // sethighlightedIndex(0);
    // console.log(updatedResults);
    // setResults([{ value: 'test1', label: 'test1', indexes: [0, 1, 2, 3, 4] }]);
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
    if (results !== undefined && results.length !== 0) {
      if (e.key === 'Escape') {
        setResults([]);
        sethighlightedIndex(0);
      }
      if (e.key === 'Tab') {
        handleSubmit(e, highlightedIndex);
      }
      if (e.key === 'Enter') {
        handleSubmit(e, highlightedIndex);
      }
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

  const highlight = index => {
    if (highlightedIndex === index) {
      return 'bg-grey-dark p-2 font-bold cursor-default';
    } else {
      return 'bg-grey-light p-2 font-bold cursor-default';
    }
  };

  const SearchResults = () => {
    return results.map((result, index) => (
      <Result key={result.value} result={result} index={index} />
    ));
  };

  const handleOnMouseEnter = (e, index) => {
    console.log('enter');
    return sethighlightedIndex(p => index);
  };

  const handleSubmit = (e, index) => {
    console.log('click');
    e.preventDefault();
    if (results !== undefined && results.length !== 0) {
      //addTask(uuid(), results[index].label);
      //setResults([]);
      sethighlightedIndex(0);
      setInput('');
    }
  };

  const Result = ({ result, index }) => {
    return (
      <div
        onMouseEnter={e => handleOnMouseEnter(e, index)}
        onClick={e => handleSubmit(e, index)}
        // onMouseLeave={() => {
        //   sethighlightedIndex(0);
        // }}
        className={highlight(index)}
      >
        {replaceAt(result.indexes, result.label)}
      </div>
    );
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
      <div className="flex-inline">
        <SearchResults results={results} />
      </div>
    </form>
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
};

// {} for event only
// {() => (VALUE)} for other only
// {(e) => (e,VALUE)} for when event+other
