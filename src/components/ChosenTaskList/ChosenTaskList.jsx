import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { completeTask, undoChosenTask } from '../../reducers/tasks'; // Import the new action
import { FaUndo, FaCheckCircle } from 'react-icons/fa';

export const ChosenTaskList = () => {
  const dispatch = useDispatch();
  const chosenTasks = useSelector((state) => state.tasks.chosenTasks);
  const chosenTaskCount = chosenTasks ? chosenTasks.length : 0;

  const handleCompleteTask = (taskId) => {
    dispatch(completeTask({ taskId }));
  };

  const handleUndoChosenTask = (taskId) => {
    dispatch(undoChosenTask({ taskId }));
  };

  return (
    <ChosenTaskListWrapper>
      <h2>Chosen ({chosenTaskCount})</h2>
      {chosenTasks && chosenTasks.length > 0 ? (
        <ul>
          {chosenTasks.map((task) => (
            <li key={task.id}>
              <TaskText>{task.text}</TaskText>
              <FaCheckCircle
                style={{
                  color: 'green',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  padding: '6px', // Adjusted padding
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '33px', // Increased font size
                  marginLeft: 'auto', // Move to the right
                  marginRight: '8px', // Add some space between buttons
                  marginBottom: '8px', // Add space between buttons and the bottom
                  transition: 'ease-in 0.3s',
                }}
                onClick={() => handleCompleteTask(task.id)}
              />
              <FaUndo
                style={{
                  color: 'black',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  padding: '8px', // Adjusted padding
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '33px', // Increased font size
                  marginLeft: 'auto', // Move to the right
                  marginRight: '8px', // Add some space between buttons
                  marginBottom: '8px', // Add space between buttons and the bottom
                  transition: 'ease-in 0.3s',
                }}
                onClick={() => handleUndoChosenTask(task.id)}
              />
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
    font-size: 1.2rem;
    margin-bottom: 10px;
    margin-bottom: 18px;
    font-weight: 200;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 8px;
    font-family: 'Helvetica', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid black;
    border-right: 1px solid #0000003b;
    padding: 10px 4px;
    margin-bottom: 6px;
  }
  @media (max-width: 420px) {
    h2, p {
      font-size: 95%;
    }
  }
`;

const TaskText = styled.span`
  margin-bottom: 8px;
  font-size: 13px;
`;
