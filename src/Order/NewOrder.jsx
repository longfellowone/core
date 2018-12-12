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

  return (
    <div>
      {errorMessage && <div>ERROR {errorMessage}</div>}
      <Provider value={dispatch}>
        <div>New Order</div> <div>loading? {isLoading ? 'Yes' : 'No'}</div>
        <OrderList order={order} />
        <OrderForm />
      </Provider>
    </div>
  );
};

const OrderForm = () => {
  const dispatch = useContext(Context);
  const [productInput, setProductInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');

  const inputClass = 'bg-white border';
  const buttonClass = 'bg-green border uppercase';

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

  return (
    <div>
      <form>
        <input
          value={productInput}
          onChange={handleProduct}
          className={inputClass}
        />
        <AutoComplete />
        <input
          value={quantityInput}
          onChange={handleQuantity}
          className={inputClass}
        />
        <button onClick={handleSubmit} className={buttonClass}>
          Add
        </button>
      </form>
    </div>
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

const LineItem = ({ product }) => {
  return <div>{product}</div>;
};

const addLineItem = order => {
  return [
    ...order,
    {
      uuid: Date.now(),
      product: 'Product 2',
      quantity: '100',
      uom: 'ea',
      saved: false,
    },
  ];
};

export { NewOrder };
