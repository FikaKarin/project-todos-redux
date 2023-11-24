import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { completeTask } from '../../reducers/tasks';

export const ChosenTaskList = () => {
  const dispatch = useDispatch();
  const chosenTasks = useSelector((state) => state.tasks.chosenTasks);
  const chosenTaskCount = chosenTasks ? chosenTasks.length : 0;

  const handleCompleteTask = (taskId) => {
    dispatch(completeTask({ taskId })); // Ensure you pass taskId as an object
  };

  return (
    <ChosenTaskListWrapper>
      <h2>Chosen Tasks ({chosenTaskCount})</h2>
      {chosenTasks && chosenTasks.length > 0 ? (
        <ul>
          {chosenTasks.map((task) => (
            <li key={task.id}>
              {task.text}
              <button onClick={() => handleCompleteTask(task.id)}>
                Complete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chosen tasks yet.</p>
      )}
    </ChosenTaskListWrapper>
  );
};

const ChosenTaskListWrapper = styled.div`
  margin-bottom: 20px;
  width: 300px;
  padding: 0 6px;
  h2 {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 8px;
    font-family: 'Helvetica', sans-serif;

    button {
      margin-left: 8px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: 'Helvetica', sans-serif;

      &:hover {
        background-color: #218838;
      }
    }
  }
`;
