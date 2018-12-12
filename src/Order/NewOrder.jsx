import React, { useReducer, useContext, useState } from 'react';

const Context = React.createContext();
const { Provider } = Context;
const initialState = {
  order: [],
  isLoading: true,
  orderMessage: '',
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      return {
        ...state,
        order: addLineItem(state.order),
        isLoading: false,
        errorMessage: '',
      };
    }
    case 'REMOVE': {
      return {
        ...state,
        order: [...state.order],
        isLoading: false,
        errorMessage: '',
      };
    }
    case 'EDIT': {
      return {
        ...state,
        order: [...state.order],
        isLoading: false,
        errorMessage: '',
      };
    }
    default:
      return state;
  }
}

const NewOrder = () => {
  const [{ order, isLoading, errorMessage }, dispatch] = useReducer(
    orderReducer,
    initialState,
  );

  // {isLoading ? 'Yes' : 'No'}
  return (
    <div>
      {errorMessage && <div>ERROR {errorMessage}</div>}
      <Provider value={dispatch}>
        <div className="max-w-sm mx-auto">
          <div>
            <OrderList order={order} />
          </div>
          <br />
          <OrderForm />
        </div>
      </Provider>
    </div>
  );
};

const OrderForm = () => {
  const dispatch = useContext(Context);
  const [productInput, setProductInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');

  const handleProduct = e => {
    e.preventDefault();
    setProductInput(e.target.value);
  };

  const handleQuantity = e => {
    e.preventDefault();
    setQuantityInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch({ type: 'ADD' });
  };

  const productInputClass =
    'bg-white border border-grey-darkest p-2 w-3/5 -ml-px';
  const quantityInputClass =
    'bg-white border border-grey-darkest rounded-l-lg p-2 w-1/5';
  const buttonClass =
    'bg-green-dark border border-grey-darkest text-white font-thin rounded-r-lg p-2 -ml-px';

  return (
    <form className="inline-flex justify-center">
      <input
        value={quantityInput}
        onChange={handleQuantity}
        className={quantityInputClass}
        placeholder="Quantity"
      />
      <input
        value={productInput}
        onChange={handleProduct}
        className={productInputClass}
        placeholder="Product"
      />
      <AutoComplete />
      <button onClick={handleSubmit} className={buttonClass}>
        Add
      </button>
    </form>
  );
};

const AutoComplete = () => {
  return null;
};

const OrderList = ({ order }) => {
  return order.map(line => {
    return <LineItem key={line.uuid} {...line} />;
  });
};

const LineItem = ({ product, quantity, uom }) => {
  return (
    <div className="flex mt-1 font-semibold text-xl">
      <div className="w-1/5 text-right">
        {quantity}
        <span className="font-normal pl-1">{uom}</span>
      </div>
      <div className="w-4/5 pl-3">{product}</div>
    </div>
  );
};

const addLineItem = order => {
  return [
    ...order,
    {
      uuid: Date.now(),
      product: '1/2" EMT Connector',
      quantity: '100',
      uom: 'ea',
      saved: false,
    },
    {
      uuid: Date.now(),
      product: '3/4" EMT Coupling',
      quantity: '250',
      uom: 'ea',
      saved: false,
    },
    {
      uuid: Date.now(),
      product: '2" PVC 90',
      quantity: '10',
      uom: 'ea',
      saved: false,
    },
    {
      uuid: Date.now(),
      product: '2" Flex',
      quantity: '1000',
      uom: 'ft',
      saved: false,
    },
  ];
};

export { NewOrder };
