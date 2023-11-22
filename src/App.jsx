import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tasksReducer from './reducers/tasks';
import { TaskList } from './components/TaskList/TaskList';
import { TaskForm } from './components/Taskform/TaskForm';
import { ChosenTaskList } from './components/ChosenTaskList/ChosenTaskList'
import { CompletedTaskList } from './components/CompletedTasks/CompletedTasks';

const reducer = combineReducers({
  tasks: tasksReducer,
});

const store = configureStore({
  reducer,
});

export const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Make Time - Todo List App</h1>
        <TaskForm />
        <TaskList />
        <ChosenTaskList />
        <CompletedTaskList />
      </div>
    </Provider>
  );
};
