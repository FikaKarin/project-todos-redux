import React from 'react';
import { useSelector } from 'react-redux';

export const CompletedTaskList = () => {
  const completedTasks = useSelector((state) => state.tasks.completedTasks || []);
  const completedTaskCount = completedTasks.length;

  return (
    <div>
      <h2>Completed Tasks ({completedTaskCount})</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>
            {task.text} <p>Completed on: {new Date(task.completedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
