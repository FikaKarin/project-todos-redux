import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { undoCompleteTask } from '../../reducers/tasks'; // Import the action
import { FaUndo } from 'react-icons/fa';

export const CompletedTaskList = () => {
  const completedTasks = useSelector(
    (state) => state.tasks.completedTasks || []
  );
  const dispatch = useDispatch();

  const handleUndoCompleteTask = (taskId) => {
    dispatch(undoCompleteTask({ taskId })); // Dispatch the undoCompleteTask action
  };

  const formatDate = (dateTimeString) => {
    const options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  return (
    <CompletedTaskListWrapper>
      <h2>Completed ({completedTasks.length})</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>
            <CompletedTaskText>{task.text}</CompletedTaskText>
            <p>Completed on: {formatDate(task.completedAt)}</p>
            <FaUndo
              style={{
                color:'black',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '33px',
                alignSelf: 'flex-end', /* Align to the right */
                fontWeight: '600',
                marginLeft: '8px',
              }}
              onClick={() => handleUndoCompleteTask(task.id)}
            />
          </li>
        ))}
      </ul>
    </CompletedTaskListWrapper>
  );
};

const CompletedTaskListWrapper = styled.div`
  width: 300px;
  padding: 0 6px;

  h2 {
    font-size: 1.2rem;
    margin-bottom: 18px;
    font-weight: 200;
  }

  p {
    font-size: 12px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 16px;
    font-family: 'Helvetica', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CompletedTaskText = styled.span`
  margin-bottom: 8px;
  text-decoration: line-through; /* Apply strikethrough to completed tasks */
  color: #888; /* Adjust color for completed tasks */
`;

const UndoCompletionButton = styled.button`
  background: linear-gradient(to right, #ffc107, #a67e06); /* Gradient colors */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Box shadow */
  color: #212529; /* Adjust text color for the undo completion button */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 8px;
  font-family: 'Helvetica', sans-serif;
  font-size: 10px;
  align-self: flex-end; /* Align to the right */
  color: white;
  font-weight: 600;
  box-shadow: 2px 2px 4px black;

  &:hover {
    padding: 10px 18px;
    transition: ease-in 0.3s;
  }
`;
