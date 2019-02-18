import React, { useState, useReducer, useEffect } from 'react';
import { ProductSearchRequest } from './proto/search_pb';
import { searchClient } from './proto/search_grpc_web_pb';
// https://ericp.co/posts/why-react-hooks-are-great/

// const useGrpc = initialState => {
//   const [data, setData] = useState(initialState);

//   const request = async func => {
//     try {
//       const result = await func;
//       setData(result);
//     } catch (error) {}
//   };

//   return [data, setData, request];
// };

const useGrpcRequest = (setData, func) => {
  const [requests, setRequests] = useState(0);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      try {
        if (requests === 0) return;
        const result = await func;
        if (unmounted) return;
        setData(result);
      } catch (error) {}
    })();
    return () => {
      unmounted = true;
    };
  }, [requests]);

  return () => setRequests(r => r + 1);
};

export const TodoForm = ({ addTask }) => {
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 30);
  const [results, setResults] = useState([]);
  const [highlightedIndex, sethighlightedIndex] = useState(0);
  const initialState = { input: '', results: [], highlightedIndex: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [data, setData, request] = useGrpc([]);
  const [data, setData] = useState([]);
  const findProductRequest = useGrpcRequest(setData, findProduct('emt'));

  console.log(data);

  useEffect(() => {
    if (!debouncedInput) return;
    let unmounted = false;
    (async () => {
      try {
        const result = await findProduct(debouncedInput);
        if (!unmounted) {
          setResults(result);
          sethighlightedIndex(0);
        }
      } catch (error) {}
    })();
    return () => {
      unmounted = true;
    };
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

  const handleChange = e => {
    e.preventDefault();
    setInput(e.target.value);
    if (e.target.value === '') {
      setResults([]);
    }
  };

  const focusInput = input => input && input.focus();
  const handleOnSumbit = e => Submit(e, highlightedIndex);

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
      <button onClick={findProductRequest}>text</button>
      <ul className="list-reset bg-grey-light font-bold cursor-default">
        {results && resultsList}
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

const findProduct = name =>
  new Promise(resolve => {
    const request = new ProductSearchRequest();
    request.setName(name);

    const response = (err, response) => {
      if (response === null || err) {
        return resolve([]);
      }
      resolve(response.toObject().resultsList.map(product => product));
    };

    client.productSearch(request, {}, response);
  });

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
