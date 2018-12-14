import React, { useReducer, useContext, useState } from 'react';

const Context = React.createContext();
const { Provider } = Context;
const initialState = {
  order: [],
  // isLoading: true,
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      return {
        ...state,
        order: addLineItem(state.order),
        // isLoading: false,
      };
    }
    case 'REMOVE': {
      return {
        ...state,
        order: [...state.order],
        // isLoading: false,
      };
    }
    case 'EDIT': {
      return {
        ...state,
        order: [...state.order],
        // isLoading: false,
      };
    }
    default:
      return state;
  }
}

const NewOrder = () => {
  const [{ order }, dispatch] = useReducer(orderReducer, initialState); // Add isLoading
  // const [error, setError] = useState('');

  // {isLoading ? 'Yes' : 'No'}
  return (
    <>
      {/* {error && <div>ERROR: {error}</div>} */}
      <Provider value={dispatch}>
        <div className="max-w-sm mx-auto px-2 sm:text-md mt-2">
          <ul className="list-reset">
            <OrderList order={order} />
          </ul>
          <div className="mb-1 mt-4 px-3">
            Can't find what you're looking for? <u>Click Here</u>
          </div>
          <OrderForm />
        </div>
      </Provider>
    </>
  );

  // function handleError(error) {
  //   setError(error);
  // }
};

const OrderForm = () => {
  console.log('OrderForm Render');
  const dispatch = useContext(Context);
  const [productInput, setProductInput] = useState('');
  // const [quantityInput, setQuantityInput] = useState('');

  const handleProduct = e => {
    e.preventDefault();
    setProductInput(e.target.value);
  };

  // const handleQuantity = e => {
  //   e.preventDefault();
  //   setQuantityInput(e.target.value);
  // };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(e.target.value);
    dispatch({ type: 'ADD' });
  };

  return (
    <div className="shadow-md rounded-lg">
      <div className="flex rounded-t-lg rounded-b-none border border-grey border-r-0">
        <input
          value={productInput}
          onChange={handleProduct}
          className="bg-transparent flex-1 appearance-none text-black pl-3"
          placeholder="Search for an item..."
        />
        <button
          onClick={handleSubmit}
          className="bg-green px-2 p-3 rounded-tr-lg text-white"
        >
          Add
        </button>
      </div>
      <Results />
    </div>
  );
};

const Results = () => {
  return (
    <>
      {/* <ul className="list-reset border border-grey rounded-b-lg -mt-px">
        {results.map(result => (
          <li className="flex justify-between border-t border-grey p-3 -mt-px">
            <div>{result.product}</div>
            <div>{result.uom}</div>
          </li>
        ))}
      </ul> */}
      <AutoComplete />
    </>
  );
};

const AutoComplete = () => {
  return null;
};

const OrderList = ({ order }) => {
  return order.map((line, index) => {
    return <LineItem key={index} {...line} />;
  });
};

const LineItem = ({ product, quantity, uom }) => {
  // const dispatch = useContext(Context);
  return (
    <li className="flex justify-between items-center rounded-lg border border-grey p-3 mb-1h shadow-md">
      <div className="flex-1">{product}</div>
      <div>
        {/* <input
          className="bg-transparent appearance-none rounded-none border-none text-right text-black w-32 sm:w-48"
          placeholder="Enter quantity... "
        /> */}
        {quantity} {uom}
      </div>
    </li>
  );
};

const addLineItem = order => {
  return [...order, ...fakeOrder];
};

const fakeOrder = [
  {
    uuid: Date.now(),
    product: '1/2" EMT Connector',
    quantity: 100,
    uom: 'ea',
    orderedToDate: 200,
    saved: false,
  },
  {
    uuid: Date.now(),
    product: '4" EMT',
    quantity: 250,
    uom: 'ft',
    orderedToDate: 400,
    saved: false,
  },
  {
    uuid: Date.now(),
    product: '2" PVC 90',
    quantity: 10,
    uom: 'ea',
    orderedToDate: 45,
    saved: false,
  },
  {
    uuid: Date.now(),
    product: '2" Flex',
    quantity: 1000,
    uom: 'ft',
    orderedToDate: 0,
    saved: false,
  },
  {
    uuid: Date.now(),
    product: '3/4" EMT Coupling',
    quantity: 1000,
    uom: 'ea',
    orderedToDate: 1200,
    saved: false,
  },
];

// const fakeResults = [
//   {
//     uuid: Date.now(),
//     product: '1" PVC 90',
//     uom: 'ea',
//     saved: false,
//   },
//   {
//     uuid: Date.now(),
//     product: '1" PVC TA',
//     uom: 'ea',
//     saved: false,
//   },
//   {
//     uuid: Date.now(),
//     product: '1" PVC FA',
//     uom: 'ea',
//     saved: false,
//   },
//   {
//     uuid: Date.now(),
//     product: '1" PVC Conduit',
//     uom: 'ft',
//     saved: false,
//   },
// ];

export { NewOrder };
