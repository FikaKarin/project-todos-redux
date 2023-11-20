import { createSlice } from '@reduxjs/toolkit';
import tasksData from '../tasks.json';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    allTasks: tasksData,
    completedTasks: [],
    removedTasks: [],
    dailyTaskLimit: 3,
    completedToday: [], // Added completedToday array
  },
  reducers: {
    addTask: (state, action) => {
      state.allTasks.push(action.payload);
    },
    removeTask: (state, action) => {
      const removedTask = state.allTasks.find(
        (task) => task.id === action.payload
      );
      state.allTasks = state.allTasks.filter(
        (task) => task.id !== action.payload
      );
      state.completedTasks = state.completedTasks.filter(
        (task) => task.id !== action.payload
      );
      state.removedTasks.push(removedTask);
    },
    undoRemoveTask: (state) => {
      const lastRemovedTask = state.removedTasks.pop();
      if (lastRemovedTask) {
        state.allTasks.push(lastRemovedTask);
      }
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
          // Check if the dailyTaskLimit has been reached
          if (state.completedToday.length < state.dailyTaskLimit) {
            state.completedTasks.push(task);
            state.completedToday.push(task.id);
          } else {
            // Optionally, you could handle exceeding the dailyTaskLimit here
            console.warn('Daily task limit reached!');
          }
        }
        task.completed = !task.completed;
      }
    },
    startNewDay: (state) => {
      // Reset completedToday array
      state.completedToday = [];

      // Uncheck all completed tasks
      state.allTasks.forEach((task) => {
        task.completed = false;
      });
    },
  },
});

// Export actions
export const {
  addTask,
  removeTask,
  undoRemoveTask,
  toggleTaskCompletion,
  startNewDay,
} = tasksSlice.actions;

// Export reducer
export default tasksSlice.reducer;
