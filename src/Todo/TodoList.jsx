import React from 'react';

export const TaskItem = ({ task, removeTask }) => {
  let checkPending = 'flex justify-between bg-grey-light mb-2 rounded';
  if (task.pending) checkPending += ' text-grey-dark';
  const remove = () => removeTask(task.uuid);
  return (
    <li className={checkPending}>
      <div className="p-2">{task.message}</div>
      <div>
        <button
          //disabled={task.pending}
          className="bg-red text-white p-2 px-3 rounded-tr rounded-br"
          tabIndex="-1"
          onClick={remove}
        >
          X
        </button>
      </div>
    </li>
  );
};
