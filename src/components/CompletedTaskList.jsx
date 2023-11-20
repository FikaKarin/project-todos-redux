import React from 'react';
import { useSelector } from 'react-redux';

export const CompletedTaskList = () => {
  const completedTasks = useSelector((state) => state.tasks.completedTasks);

  return (
    <div>
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>
            {task.text}{' '}
            {task.readMoreLink && (
              <a href={task.readMoreLink} target="_blank" rel="noopener noreferrer">
                More info on this topic
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
