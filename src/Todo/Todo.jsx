import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoClient } from './proto/todo_grpc_web_pb';
import { Empty, Task, RemoveTaskRequest } from './proto/todo_pb';

// const createPromiseResolver = () => {
//   let resolve;
//   const promise = new Promise(r => {
//     resolve = r;
//   });
//   return { resolve, promise };
// };

// const getTasksTest = () => {
//   const request = new Empty();

//   client.listTasks(request, {}, (err, response) => {
//     if (err) {
//       //setError(true);
//       return console.log(err);
//     }
//     //setTasks([...tasks, ...response.toObject().tasksList.map(task => task)]);
//   });
// };

export const Todo = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
    document.body.style.backgroundColor = 'grey';

    // var doubleTouchStartTimestamp = 0;
    // const funcRef = e => {
    //   var now = +new Date();
    //   if (doubleTouchStartTimestamp + 500 > now) {
    //     e.preventDefault();
    //   }
    //   doubleTouchStartTimestamp = now;
    // };

    // document.addEventListener('touchend', funcRef, false);
    // return () => {
    //   document.removeEventListener('touchend', funcRef);
    // };
  }, []);

  return (
    <div className="max-w-sm mx-auto">
      <div className="p-2 my-2 bg-grey rounded">
        <ul className="list-reset">
          {tasks.map(task => (
            <TodoList key={task.uuid} task={task} removeTask={removeTask} />
          ))}
        </ul>
        <TodoForm addTask={addTask} client={client} />
      </div>
    </div>
  );

  function getTasks() {
    const request = new Empty();

    client.listTasks(request, {}, (err, response) => {
      setTasks([]);
      // setTasks([...tasks, ...response.toObject().tasksList.map(task => task)]);
    });
  }

  function addTask(uuid, message) {
    setTasks([...tasks, { uuid, message, pending: true }]);

    const request = new Task();
    request.setUuid(uuid);
    request.setMessage(message);

    client.newTask(request, {}, err => {
      removePending(uuid);
    });
  }

  function removeTask(uuid) {
    const request = new RemoveTaskRequest();
    request.setUuid(uuid);

    client.removeTask(request, {}, err => {
      removeTaskFromState(uuid);
    });
  }

  function removeTaskFromState(uuid) {
    setTasks(currentTasks => currentTasks.filter(task => task.uuid !== uuid));
  }

  function removePending(uuid) {
    setTasks(currentTasks =>
      currentTasks.map(task => {
        if (task.uuid === uuid) {
          delete task.pending;
        }
        return task;
      }),
    );
  }
};

const client = new TodoClient(
  'http://' + window.location.hostname + ':8080',
  null,
  null,
);
