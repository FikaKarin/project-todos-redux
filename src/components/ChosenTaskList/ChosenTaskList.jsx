import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completeTask } from '../../reducers/tasks';

export const ChosenTaskList = () => {
  const chosenTasks = useSelector((state) => state.tasks.chosenTasks);
  const dispatch = useDispatch();

  const handleCompleteTask = (taskId) => {
    dispatch(completeTask({ taskId }));
  };

  return (
    <div>
      <h2>Chosen Tasks</h2>
      {chosenTasks && chosenTasks.length > 0 ? (
        <ul>
          {chosenTasks.map((task) => (
            <li key={task.id}>
              {task.text}{' '}
              <button onClick={() => handleCompleteTask(task.id)}>Completed</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chosen tasks yet.</p>
      )}
    </div>
  );
};
