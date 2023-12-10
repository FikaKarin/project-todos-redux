import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../reducers/tasks';
import styled from 'styled-components';

export const TaskForm = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      dispatch(
        addTask({ id: Date.now(), text: newTask, completed: false, dueDate })
      );
      setNewTask('');
      setDueDate('');
    }
  };

  return (
    <TaskFormWrapper>
      <h2>Add Task</h2>
      <input
        type='text'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='Enter task'
      />
      <label>
        Due Date:
        <input
          type='date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <ButtonContainer>
        <Button onClick={handleAddTask}>Add Task</Button>
      </ButtonContainer>
    </TaskFormWrapper>
  );
};

const TaskFormWrapper = styled.div`
  margin-bottom: 20px;
  background-color: #ede69e86;
  padding: 6px 8px;
  border-radius: 8px;
  box-shadow: 2px 2px 2px grey;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: 200;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: 'Helvetica', sans-serif;
  }

  label {
    display: block;
    margin-bottom: 8px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #00800081;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Helvetica', sans-serif;
  box-shadow: 2px 2px 4px black;
  font-weight: 600;

  &:hover {
    background-color: #45a049;
    padding: 10px 18px;
    transition: ease-in 0.2s;
  }
`;
