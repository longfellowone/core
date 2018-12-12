import React, { useReducer, useState } from 'react';

const initialState = { order: [] };

function orderReducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return initialState;
    case 'ADD1': {
      console.log(state.order);
      return {
        ...state,
        order: [
          ...state.order,
          {
            uuid: 'num',
            product: 'Product 3',
            quantity: '100',
            uom: 'ea',
            saved: false,
          },
        ],
      };
    }
    case 'ADD2': {
      console.log(state.order);
      return {
        ...state,
        order: [
          ...{
            uuid: 'num2',
            product: 'Product 2',
            quantity: '100',
            uom: 'ea',
            saved: false,
          },
        ],
      };
    }
    default:
      return state;
  }
}

const OrderForm = input => {
  return <input>My Input</input>;
};

const OrderLine = ({ line }) => {
  return <div>{line.uuid}</div>;
};

export const NewOrder = () => {
  const [{ order }, dispatch] = useReducer(orderReducer, initialState);
  //const [input, setInput] = useState('');

  return (
    <div>
      <div>New Order</div>
      {order.map((line, index) => {
        return <OrderLine key={index} line={line} />;
      })}
      <button onClick={() => dispatch({ type: 'ADD1' })}>ADD 1</button>
      <button onClick={() => dispatch({ type: 'ADD2' })}>ADD 2</button>
      {/* <OrderForm input={input} /> */}
    </div>
  );
};
