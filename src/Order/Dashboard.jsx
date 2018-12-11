import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div>
      <div>Dashboard</div>
      <ul className="list-reset">
        <li>
          <Link to="/order/new">New Order</Link>
        </li>
        <li>
          <Link to="/order/receive/">Recieve Order</Link>
        </li>
        <li>
          <Link to="/order/history/">Order History</Link>
        </li>
      </ul>
    </div>
  );
};
