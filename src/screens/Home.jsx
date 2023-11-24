// Import necessary dependencies and components
import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import styled from 'styled-components';
import tasksReducer from '../reducers/tasks';
import { TaskForm } from '../components/Taskform/TaskForm';
import { TaskContainer } from '../components/TaskContainer/TaskContainer'; // Update the import statement
import { TopContainer } from '../components/TopContainer/TopContainer';

// Combine reducers
const reducer = combineReducers({
  tasks: tasksReducer,
});

// Configure Redux store
const store = configureStore({
  reducer,
});

// Home component that uses the TaskContainer
export const Home = () => {
  return (
    <Provider store={store}>
      <HomeWrapper>
        <TopContainer />
        <div>
          <TaskContainer /> {/* Use the TaskContainer component here */}
        </div>
      </HomeWrapper>
    </Provider>
  );
};

// Styled component for the HomeWrapper
const HomeWrapper = styled.div`
  flex: 1;
  background-image: url('https://images.unsplash.com/photo-1454944338482-a69bb95894af?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  object-fit: contain;
  margin: 0 auto;
  max-width: 900px;
  padding: 8px;
`;
