import React from 'react';
import { useSelector } from 'react-redux';

export const ChosenTaskList = () => {
  const chosenTasks = useSelector((state) => state.tasks.chosenTasks);
  const chosenTaskCount = chosenTasks ? chosenTasks.length : 0;

  return (
    <div>
      <h2>Chosen Tasks ({chosenTaskCount})</h2>
      {chosenTasks && chosenTasks.length > 0 ? (
        <ul>
          {chosenTasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
      ) : (
        <p>No chosen tasks yet.</p>
      )}
    </div>
  );
};
