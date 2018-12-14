import React from 'react';

export const Test2 = () => {
  return (
    <>
      <div className="max-w-sm mx-auto px-2 sm:text-md mt-2">
        <ul className="list-reset">
          {lines.map(line => (
            <li className="flex justify-between items-center rounded-lg border border-grey p-3 mb-1h shadow-md">
              <div className="flex-1">{line.product}</div>
              <div>
                {line.quantity} {line.uom}
              </div>
            </li>
          ))}
          <li className="flex justify-between items-center rounded-lg border border-grey p-3 mb-1 shadow-md">
            <div>Can of PVC Glue</div>
            <div>
              <input
                className="bg-transparent appearance-none rounded-none border-none text-right text-black w-32 sm:w-48"
                placeholder="Enter quantity... "
              />
              ea
            </div>
          </li>
        </ul>

        <div className="mb-1 mt-4 px-3">
          Can't find what you're looking for? <u>Click Here</u>
        </div>
        <div className="shadow-md rounded-lg">
          <div className="flex rounded-t-lg rounded-b-none border border-grey border-r-0">
            <input
              className="bg-transparent flex-1 appearance-none text-black pl-3"
              placeholder="Search for an item..."
            />
            <button className="bg-green px-2 p-3 rounded-tr-lg text-white">
              Add
            </button>
          </div>
          <ul className="list-reset border border-grey rounded-b-lg -mt-px">
            {results.map(result => (
              <li className="flex justify-between border-t border-grey p-3 -mt-px">
                <div>{result.product}</div>
                <div>{result.uom}</div>
              </li>
            ))}
          </ul>
        </div>
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
