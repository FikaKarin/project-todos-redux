// Import createSlice function from Redux Toolkit and tasksData from tasks.json
import { createSlice } from '@reduxjs/toolkit';
import tasksData from '../tasks.json';

// Create a slice for tasks with initial state and reducers
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
    // Add a new task to the allTasks array
    addTask: (state, action) => {
      state.allTasks.push(action.payload);
    },
    // Remove a task by its ID, move it to removedTasks array
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
    // Undo the removal of the last removed task
    undoRemoveTask: (state) => {
      const lastRemovedTask = state.removedTasks.pop();
      if (lastRemovedTask) {
        state.allTasks.push(lastRemovedTask);
      }
    },
    // Toggle the completion status of a task
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
    // Start a new day by resetting completedToday array and unchecking all completed tasks
    startNewDay: (state) => {
      state.completedToday = [];
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