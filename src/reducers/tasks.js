import { createSlice } from '@reduxjs/toolkit';
import tasksData from '../tasks.json';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    allTasks: tasksData,
    completedTasks: [],
    dailyTaskLimit: 3,
  },
  reducers: {
    addTask: (state, action) => {
      state.allTasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.allTasks = state.allTasks.filter(
        (task) => task.id !== action.payload
      );
      state.completedTasks = state.completedTasks.filter(
        (task) => task.id !== action.payload
      );
    },
    toggleTaskCompletion: (state, action) => {
      const taskId = action.payload;
      const task = state.allTasks.find((task) => task.id === taskId);

      if (task) {
        if (task.completed) {
          state.completedTasks = state.completedTasks.filter(
            (task) => task.id !== taskId
          );
        } else {
          state.completedTasks.push(task);
        }
        task.completed = !task.completed;
      }
    },
  },
});

// Export actions
export const { addTask, removeTask, toggleTaskCompletion } = tasksSlice.actions;

// Export reducer
export default tasksSlice.reducer;
