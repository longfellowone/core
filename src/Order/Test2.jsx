import React from 'react';

export const Test2 = () => {
  return (
    <>
      <div className="max-w-lg mx-auto px-2 sm:text-2xl">
        <ul className="list-reset">
          {lines.map(line => (
            <li className="rounded border border-grey p-2 mb-1 shadow">
              {line.quantity} {line.uom} {line.product}
            </li>
          ))}
        </ul>

        <div className="">
          {/* <input className="bg-blue appearance-none rounded-none border-none mb-2" /> */}
          <div className="flex">
            <input
              className="bg-transparent flex-1 appearance-none rounded-tl rounded-tr-none rounded-b-none border border-grey border-r-0 text-black w-full pl-3 shadow"
              placeholder="Search for an item..."
            />
            <button className="bg-green px-2 p-3 rounded-tr shadow relative">
              Add
            </button>
          </div>
        </div>
        <ul className="list-reset border border-grey rounded-b -mt-px shadow relative">
          {results.map(result => (
            <li className="border-t border-grey p-3 -mt-px">
              {result.product}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const lines = [
  {
    uuid: Date.now(),
    product: '1/2" EMT Connector',
    quantity: 100,
    uom: 'ea',
    saved: false,
  },
  {
    uuid: Date.now(),
    product: '4" EMT',
    quantity: 250,
    uom: 'ft',
    saved: false,
  },
  {
    uuid: Date.now(),
    product: '2" PVC 90',
    quantity: 10,
    uom: 'ea',
    saved: false,
  },
  {
    uuid: Date.now(),
    product: '2" Flex',
    quantity: 1000,
    uom: 'ft',
    saved: false,
  },
  {
    uuid: Date.now(),
    product: '3/4" EMT Coupling',
    quantity: 1000,
    uom: 'ea',
    saved: false,
  },
];

const results = [
  {
    uuid: Date.now(),
    product: '1" PVC 90',
    uom: 'ea',
    saved: false,
  },
  {
    uuid: Date.now(),
    product: '1" PVC TA',
    uom: 'ea',
    saved: false,
  },
  {
    uuid: Date.now(),
    product: '1" PVC FA',
    uom: 'ea',
    saved: false,
  },
  {
    uuid: Date.now(),
    product: '1" PVC Conduit',
    uom: 'ft',
    saved: false,
  },
];
