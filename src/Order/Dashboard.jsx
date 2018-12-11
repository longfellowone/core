import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  console.log();
  return (
    <div>
      <div>Dashboard</div>
      <ul className="list-reset">
        <li>
          <Link to="/new">New Order</Link>
        </li>
        <li>
          <Link to="/receive/">Recieve Order</Link>
        </li>
        <li>
          <Link to="/history/">Order History</Link>
        </li>
      </ul>
    </div>
  );
};
