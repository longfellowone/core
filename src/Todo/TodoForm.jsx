import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FindProductRequest } from './proto/todo_pb';

export const TodoForm = ({ addTask, taskRef, client }) => {
  const [results, setResults] = useState([]);
  const [highlightedIndex, sethighlightedIndex] = useState(0);

  const handleSubmit = (e, index) => {
    e.preventDefault();
    //if (!value) return;
    if (results !== undefined && results.length !== 0) {
      addTask(uuid(), results[index].label);
      setResults([]);
      taskRef.current.value = '';
    }
  };

  const handleChange = async () => {
    const currentSearch = taskRef.current.value;
    const newSearch = currentSearch.replace(/[\u201C\u201D]/g, '"');
    const updatedResults = await findProduct(newSearch);
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

  const onKeyPressed = (e, index) => {
    if (results !== undefined && results.length !== 0) {
      if (e.key === 'Escape') {
        setResults([]);
        sethighlightedIndex(0);
      }
      if (e.key === 'Tab') {
        handleSelect(e, highlightedIndex);
      }
      if (e.key === 'Enter') {
        handleSelect(e, highlightedIndex);
      }
      if (e.key === 'ArrowDown') {
        if (highlightedIndex !== results.length - 1) {
          taskRef.current.value = results[highlightedIndex + 1].label;
          sethighlightedIndex(highlightedIndex => highlightedIndex + 1);
        }
      }
      if (e.key === 'ArrowUp') {
        if (highlightedIndex !== 0) {
          taskRef.current.value = results[highlightedIndex - 1].label;
          sethighlightedIndex(highlightedIndex => highlightedIndex - 1);
        }
      }
    }
  };

  const highlight = index => {
    if (highlightedIndex === index) {
      return 'bg-grey-dark p-2 font-bold cursor-pointer ';
    } else {
      return 'bg-grey-light p-2 font-bold cursor-pointer hover:bg-grey-dark';
    }
  };

  const handleSelect = (e, index) => {
    e.preventDefault();
    handleSubmit(e, index);
    sethighlightedIndex(0);
  };

  const SearchResults = () => {
    return results.map((result, index) => {
      return (
        <li
          onKeyDown={onKeyPressed}
          onClick={e => handleSelect(e, index)}
          key={result.value}
          className={highlight(index)}
        >
          {replaceAt(result.label, result.indexes)}
        </li>
      );
    });
  };

  return (
    <form>
      <input
        className="w-full bg-grey-light rounded-t p-2 text-black"
        placeholder="Add new task..."
        onChange={handleChange}
        ref={taskRef}
        onKeyDown={onKeyPressed}
        tabIndex="0"
      />
      <ul className="list-reset">
        <SearchResults results={results} />
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
