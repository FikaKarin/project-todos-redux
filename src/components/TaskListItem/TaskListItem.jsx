import React from 'react';
import styled from 'styled-components';

export const TaskListItem = ({
  task,
  handleToggleChosen,
  handleRemoveTask,
  handleUndoRemoveTask,
}) => (
  <TaskListItemWrapper>
    <li key={task.id}>
      <div>
        <input
          type='checkbox'
          checked={task.chosen || false}
          onChange={() => handleToggleChosen(task.id)}
        />
        <p>{task.text}</p>
        <p className='created-date'>
          Created on: {new Date(task.createdAt).toLocaleString()}
        </p>
        {task.readMoreLink && (
          <a href={task.readMoreLink} target='_blank' rel='noopener noreferrer'>
            Read more
          </a>
        )}
        {task.dueDate && (
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
        )}
      </div>
      <div className='action-buttons'>
        {task.isRemoved && (
          <button onClick={() => handleUndoRemoveTask(task.id)}>
            Undo Remove
          </button>
        )}
        <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
      </div>
    </li>
  </TaskListItemWrapper>
);

const TaskListItemWrapper = styled.div`
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 8px;
    border-top: 2px solid black;
    border-radius: 4px;
    font-family: 'Helvetica', sans-serif;

    &:last-child {
      margin-bottom: 0;
    }

    div {
      flex-grow: 1;
      width: 100%;
    }

    p {
      margin-bottom: 5px;
      color: black;
    }

    .created-date {
      font-size: 0.8rem;
      color: #686767;
    }

    a {
      text-decoration: none;
      color: #007bff;
      margin-right: 10px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .action-buttons {
    display: flex;

    button {
      padding: 8px 16px;
      background-color: #ca071b;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: 'Helvetica', sans-serif;

      &:hover {
        background-color: #c82333;
      }
    }

    button:last-child {
      margin-left: auto;
    }
  }
`;
