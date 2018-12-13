import React from 'react';

export const Vivian = () => {
  return (
    <>
      <nav className="flex border-b border-blue-dark font-semibold text-blue-dark mb-8">
        <div className="p-2 mr-1">Home</div>
        <div className="p-2 mr-1">Admin</div>
        <div className="p-2 mr-1">Help</div>
      </nav>

      <header className="mb-10">
        <h1>Dashboard</h1>
      </header>
      <div className="flex justify-center mb-12">
        <div className="sm:inline-flex">
          <div>
            <button className="bg-green sm:w-64 w-full mx-2 p-8 font-semibold text-2xl text-black hover:text-white hover:bg-green-light rounded">
              New Order
            </button>
          </div>
          <div>
            <button className="sm:mt-0 mt-4 bg-orange sm:w-64 w-full mx-2 p-8 font-semibold text-2xl text-black hover:text-white hover:bg-orange-light rounded">
              Receive Order
            </button>
          </div>
        </div>
      </div>
      <div className="sm:flex justify-center">
        <div className="bg-purple">Text</div>
        <div className="bg-green">Text</div>
      </div>
      <div>
        <div className="border border-red">
          <div className="border-b-2 border-black flex">
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

        {/* <table className="table-auto border-grey border w-full">
          <tr className="h-8">
            <th className="text-left text-lg border border-grey border-b-2 p-1">
              Order Number
            </th>
            <th className="text-left text-lg border border-grey border-b-2 p-1">
              Project
            </th>
            <th className="text-left text-lg border border-grey border-b-2 p-1">
              Status
            </th>
          </tr>
          <tr>
            <td className="h-6 border border-grey p-1">12-Nov-2018</td>
            <td className="h-6 border border-grey p-1">Argyle</td>
            <td className="h-6 border border-grey p-1">Pending</td>
          </tr>
          <tr>
            <td className="h-6 border border-grey p-1">08-Dec-2018</td>
            <td className="h-6 border border-grey p-1">Argyle</td>
            <td className="h-6 border border-grey p-1">Partial</td>
          </tr>
          <tr>
            <td className="h-6 border border-grey p-1">29-Nov-2018</td>
            <td className="h-6 border border-grey p-1">Argyle</td>
            <td className="h-6 border border-grey p-1">Filled</td>
          </tr>
        </table> */}
      </div>
    </>
  );
};

const orders = [
  {
    uuid: Date.now(),
    date: 'December 12, 2018',
    project: 'Project 1',
    status: 'Not Complete',
  },
  {
    uuid: Date.now(),
    date: 'December 13, 2018',
    project: 'Project 2',
    status: 'Not Complete',
  },
  {
    uuid: Date.now(),
    date: 'December 14, 2018',
    project: 'Project 3',
    status: 'Complete',
  },
  {
    uuid: Date.now(),
    date: 'December 15, 2018',
    project: 'Project 4',
    status: 'Complete',
  },
];
