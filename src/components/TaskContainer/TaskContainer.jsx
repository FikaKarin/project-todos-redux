// Import necessary dependencies and components
import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import styled from 'styled-components';
import tasksReducer from '../../reducers/tasks';
import { TaskList } from '../../components/TaskList/TaskList';
import { ChosenTaskList } from '../../components/ChosenTaskList/ChosenTaskList';
import { CompletedTaskList } from '../../components/CompletedTasks/CompletedTasks';

// Combine reducers
const reducer = combineReducers({
  tasks: tasksReducer,
});

// Configure Redux store
const store = configureStore({
  reducer,
});

// Create a new component to wrap the task-related components
export const TaskContainer = () => {
  return (
    <TaskContainerWrapper>
      <TaskList />
      <ChosenTaskList />
      <CompletedTaskList />
    </TaskContainerWrapper>
  );
};

// Styled component for the wrapper
const TaskContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; // Adjust as needed
  background-image: linear-gradient(to right, #f5f5dcd1 70%, #63bc63b9 90%);
  padding-left: 16px;
  border-radius: 16px;
  box-shadow: 2px 2px 4px black;
  padding-bottom: 8px;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 16px;
`;
