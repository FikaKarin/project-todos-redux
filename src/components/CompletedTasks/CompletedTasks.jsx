import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const CompletedTaskList = () => {
  const completedTasks = useSelector(
    (state) => state.tasks.completedTasks || []
  );
  const completedTaskCount = completedTasks.length;

  return (
    <CompletedTaskListWrapper>
      <h2>Completed Tasks ({completedTaskCount})</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>
            {task.text}{' '}
            <p>Completed on: {new Date(task.completedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </CompletedTaskListWrapper>
  );
};

const CompletedTaskListWrapper = styled.div`
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

    p {
      font-size: 0.8rem;
      color: #888;
    }
  }
`;
