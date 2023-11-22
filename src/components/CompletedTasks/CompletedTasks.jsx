import React from 'react';
import { useSelector } from 'react-redux';

export const CompletedTaskList = () => {
  const completedTasks = useSelector(
    (state) => state.tasks.completedTasks || []
  );

  return (
    <div>
      <h2>Completed Tasks</h2>
      {completedTasks && completedTasks.length > 0 ? (
        <ul>
          {completedTasks.map((task) => (
            <li key={task.id}>
              {task.text}{' '}
              <p>Completed on: {new Date(task.completedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No completed tasks yet</p>
      )}
    </div>
  );
};
