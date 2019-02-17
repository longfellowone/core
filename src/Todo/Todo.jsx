import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { TaskItem } from './TodoList';
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
  return (
    <div className="max-w-sm mx-auto">
      <div className="p-2 my-2 bg-grey rounded">
        <ul className="list-reset" />
        <TodoWrap />
      </div>
    </div>
  );
};

export const TodoWrap = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
    document.body.style.backgroundColor = 'grey';
  }, []);

  const taskList = tasks.map(task => (
    <TaskItem key={task.uuid} task={task} removeTask={removeTask} />
  ));

  return (
    <>
      {taskList}
      <TodoForm addTask={addTask} client={client} />
    </>
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
