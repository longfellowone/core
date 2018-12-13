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
      <div className="flex mb-12">
        <button className="bg-green p-8 mr-8 font-semibold text-2xl text-black hover:text-white hover:bg-green-light rounded">
          New Order
        </button>

        <button className="bg-orange p-5 font-semibold text-2xl text-black hover:text-white hover:bg-orange-light rounded">
          Receive Order
        </button>
      </div>

      <div>
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
