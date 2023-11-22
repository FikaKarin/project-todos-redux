// Import createSlice function from Redux Toolkit and tasksData from tasks.json
import { createSlice } from '@reduxjs/toolkit';
import tasksData from '../tasks.json';

// Create a slice for tasks with initial state and reducers
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    allTasks: tasksData.map((task) => ({
      ...task,
      createdAt: new Date().toISOString(), // Convert to string
      dueDate: null,
    })),
    chosenTasks: [], // Updated from chosenTasks
    removedTasks: [],
    dailyTaskLimit: 3,
    chosenToday: [], // Make sure this is present
    completedTasks: [], // Add this line to initialize completedTasks as an empty array
  },
  reducers: {
    // Add a new task to the allTasks array
    addTask: (state, action) => {
      const { text, dueDate } = action.payload;
      const newTask = {
        id: Date.now(),
        text,
        chosen: false,
        createdAt: new Date().toISOString(), // Convert to a string
        dueDate,
      };
      state.allTasks.push(newTask);
    },
    // Remove a task by its ID, move it to removedTasks array
    removeTask: (state, action) => {
      const removedTask = state.allTasks.find(
        (task) => task.id === action.payload
      );
      state.allTasks = state.allTasks.filter(
        (task) => task.id !== action.payload
      );
      state.chosenTasks = state.chosenTasks.filter(
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
    completeTask: (state, action) => {
      const { taskId } = action.payload;
      const taskToComplete = state.chosenTasks.find(
        (task) => task.id === taskId
      );

      if (taskToComplete) {
        // Remove the task from chosenTasks
        state.chosenTasks = state.chosenTasks.filter(
          (task) => task.id !== taskId
        );

        // Add the completed task to completedTasks
        state.completedTasks.push({
          ...taskToComplete,
          completedAt: new Date().toISOString(), // You can add a completed timestamp
        });
      }
    },
    // Toggle the chosen status of a task
    toggleTaskChosen: (state, action) => {
      const taskId = action.payload;
      const task = state.allTasks.find((task) => task.id === taskId);

      if (task) {
        if (task.chosen) {
          state.chosenTasks = state.chosenTasks.filter(
            (task) => task.id !== taskId
          );
        } else {
          // Check if the dailyTaskLimit has been reached
          if (state.chosenToday.length < state.dailyTaskLimit) {
            state.chosenTasks.push(task);
            state.chosenToday.push(task.id);
          } else {
            console.warn('Daily task limit reached!');
          }
        }
        task.chosen = !task.chosen; // Updated from chosen
      }
    },
    // Start a new day by resetting chosenToday array and unchecking all chosen tasks
    startNewDay: (state) => {
      state.chosenToday = [];
      state.allTasks.forEach((task) => {
        task.chosen = false;
      });
    },
  },
});

// Export actions
export const {
  addTask,
  removeTask,
  undoRemoveTask,
  toggleTaskChosen,
  startNewDay,
  completeTask
} = tasksSlice.actions;

// Export reducer
export default tasksSlice.reducer;
