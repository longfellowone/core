import React from 'react';

export const Test = () => {
  return (
    <>
      <div className="max-w-lg mx-auto px-2 text-xl">
        <div className="flex justify-center mx-auto">
          <div className="inline-flex">
            <div className="py-4 text-2xl">
              <div className="flex mb-1">
                <div className="w-32 text-right pr-1 font-semibold">
                  10,0000
                </div>
                <div className="w-8">ft</div>
                <div className="w-full font-semibold">1/2" EMT Connectors</div>
              </div>
              <div className="flex mb-1">
                <div className="w-32 text-right pr-1 font-semibold">
                  10,0000
                </div>
                <div className="w-8">ft</div>
                <div className="w-full font-semibold">1/2" EMT Connectors</div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="border border-grey-lighter shadow px-4 sm:py-3">
            <input
              className="bg-white w-full appearance-none rounded-none"
              placeholder="Search..."
            />
          </div>
          <div className="bg-white shadow border-t border-grey-lighter px-4 pt-1">
            <div className="mb-2">1/2" EMT Connector</div>
            <div className="mb-2">3/4" EMT Connector</div>
            <div className="mb-2">1/2" EMT Coupling</div>
          </div>
        </div>
      </div>
    </>
  );
};
