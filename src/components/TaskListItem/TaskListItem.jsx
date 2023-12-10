import React from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

export const TaskListItem = ({
  task,
  handleToggleChosen,
  handleRemoveTask,
}) => {
  // Add the formatDate function directly here
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
    <TaskListItemWrapper>
      <li key={task.id}>
        <div>
          <input
            type='checkbox'
            checked={task.chosen || false}
            onChange={() => handleToggleChosen(task.id)}
          />
          <p>{task.text}</p>
          <p className='created-date'>Created: {formatDate(task.createdAt)}</p>
          {task.readMoreLink && (
            <a
              href={task.readMoreLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              Read more
            </a>
          )}
          {task.dueDate && (
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          )}
        </div>
        <div className='action-buttons'>
          <FaTrashStyled
            onClick={() => handleRemoveTask(task.id)}
          />
        </div>
      </li>
    </TaskListItemWrapper>
  );
};

const TaskListItemWrapper = styled.div`
  li {
    display: flex;
    flex-direction: column; /* Change to column */
    align-items: stretch; /* Align items in a column */
    margin-bottom: 10px;
    padding: 8px;
    border-bottom: 1px solid black;
    border-right: 1px solid #0000003b;
    font-family: 'Helvetica', sans-serif;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in;

    &:hover {
      transform: scale(1.05);
    }

    &.added-to-list {
      opacity: 0;
      transform: translateY(20px);
    }
    &:last-child {
      margin-bottom: 0;
    }

    div {
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
  @media (max-width: 420px) {
    li {
      padding: 0;
    }
  }

  .action-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: auto;
    padding: 8px;
  }
`;

const FaTrashStyled = styled(FaTrash)`
  color: red;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 8px; // Adjusted padding
  border-radius: 4px;
  cursor: pointer;
  font-size: 33px; // Increased font size
  transition: ease-in 0.3s;

  &:hover {
    transition: ease-in 0.3s;
  }
`;
