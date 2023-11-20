// src/components/TaskList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTaskCompletion } from '../reducers/tasks';

export const TaskList = () => {
  const allTasks = useSelector(state => state.tasks.allTasks);
  const dispatch = useDispatch();

  const handleToggleCompletion = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  return (
    <div>
      <h2>All Tasks</h2>
      <ul>
        {allTasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompletion(task.id)}
            />
            {task.text}{' '}
            {task.readMoreLink && <a href={task.readMoreLink} target="_blank" rel="noopener noreferrer">Read more</a>}
          </li>
        ))}
      </ul>
    </div>
  );
};

