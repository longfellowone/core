import React from 'react';

export const Vivian = () => {
  return (
    <>
      <nav className="flex border-b border-blue-dark font-semibold mb-8 m-2">
        <div className="p-2 mr-1">
          {' '}
          <a
            href="/"
            className="no-underline text-blue-dark hover:text-blue-light"
          >
            Home
          </a>
        </div>
        <div className="p-2 mr-1">
          {' '}
          <a
            href="/"
            className="no-underline text-blue-dark hover:text-blue-light"
          >
            Admin
          </a>
        </div>
        <div className="p-2 mr-1">
          {' '}
          <a
            href="/"
            className="no-underline text-blue-dark hover:text-blue-light"
          >
            Help
          </a>
        </div>
      </nav>

      <header className="mb-10 m-2">
        <h1>Dashboard</h1>
      </header>
      <div className="flex justify-center mb-12">
        <div className="sm:inline-flex">
          <div>
            <button className="bg-green sm:w-64 w-full mx-2 p-8 font-semibold text-2xl text-black hover:text-white hover:bg-green-light rounded shadow">
              New Order
            </button>
          </div>
          <div>
            <button className="sm:mt-0 mt-4 bg-orange sm:w-64 w-full mx-2 p-8 font-semibold text-2xl text-black hover:text-white hover:bg-orange-light rounded shadow">
              Receive Order
            </button>
          </div>
        </div>
      </div>
      <div className="m-2">
        <h4>Order History</h4>
      </div>
      <div className="m-2">
        <div className="border shadow rounded-sm">
          <div className="border-b-2 border-black flex font-semibold bg-blue-lighter">
            <div className="flex-1">Date</div>
            <div className="flex-1">Project</div>
            <div className="flex-1">Status</div>
          </div>
          {orders.map(order => (
            <div className="border-b flex">
              <div className="flex-1">{order.date}</div>
              <div className="flex-1">{order.project}</div>
              <div className="flex-1">{order.status}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const orders = [
  {
    uuid: Date.now(),
    date: '12-Dec-2018',
    project: 'Project 1',
    status: 'Not Complete',
  },
  {
    uuid: Date.now(),
    date: '13-Dec-2018',
    project: 'Project 2',
    status: 'Not Complete',
  },
  {
    uuid: Date.now(),
    date: '14-Dec-2018',
    project: 'Project 3',
    status: 'Complete',
  },
  {
    uuid: Date.now(),
    date: '15-Dec-2018',
    project: 'Project 4',
    status: 'Complete',
  },
  {
    uuid: Date.now(),
    date: '16-Dec-2018',
    project: 'Project 5',
    status: 'Complete',
  },
  {
    uuid: Date.now(),
    date: '17-Dec-2018',
    project: 'Project 6',
    status: 'Not Complete',
  },
  {
    uuid: Date.now(),
    date: '18-Dec-2018',
    project: 'Project 7',
    status: 'Complete',
  },
  {
    uuid: Date.now(),
    date: '19-Dec-2018',
    project: 'Project 8',
    status: 'Not Complete',
  },
];
