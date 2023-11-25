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
    undoChosenTask: (state, action) => {
      const { taskId } = action.payload;
      const undoneTask = state.chosenTasks.find((task) => task.id === taskId);

      if (undoneTask) {
        // Remove the task from chosenTasks
        state.chosenTasks = state.chosenTasks.filter(
          (task) => task.id !== taskId
        );

        // Reset the chosen property
        undoneTask.chosen = false;

        // Add the undone task back to allTasks
        state.allTasks.push(undoneTask);
      }
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

        // Check if the undone task was chosen and remove it from chosenTasks
        if (lastRemovedTask.chosen) {
          state.chosenTasks = state.chosenTasks.filter(
            (task) => task.id !== lastRemovedTask.id
          );

          // Also update the chosenToday array if needed
          const index = state.chosenToday.indexOf(lastRemovedTask.id);
          if (index !== -1) {
            state.chosenToday.splice(index, 1);
          }
        }
      }
    },
    undoRemoveTask: (state) => {
      const lastRemovedTask = state.removedTasks.pop();
      if (lastRemovedTask) {
        state.allTasks.push(lastRemovedTask);

        // Check if the undone task was chosen and remove it from chosenTasks
        if (lastRemovedTask.chosen) {
          state.chosenTasks = state.chosenTasks.filter(
            (task) => task.id !== lastRemovedTask.id
          );

          // Also update the chosenToday array if needed
          const index = state.chosenToday.indexOf(lastRemovedTask.id);
          if (index !== -1) {
            state.chosenToday.splice(index, 1);
          }
        }
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

        // Check if the task was already completed
        const alreadyCompleted =
          state.completedTasks.findIndex((task) => task.id === taskId) !== -1;

        if (!alreadyCompleted) {
          // Add the completed task to completedTasks
          state.completedTasks.push({
            ...taskToComplete,
            completedAt: new Date().toISOString(),
          });
        } else {
          // If the task was already completed, move it back to chosenTasks
          state.chosenTasks.push(taskToComplete);
        }
      }
    },
    undoCompleteTask: (state, action) => {
      const { taskId } = action.payload;
      const undoneTask = state.completedTasks.find(
        (task) => task.id === taskId
      );

      if (undoneTask) {
        // Remove the task from completedTasks
        state.completedTasks = state.completedTasks.filter(
          (task) => task.id !== taskId
        );

        // Reset the completedAt timestamp
        undoneTask.completedAt = null;

        // Add the undone task back to chosenTasks
        state.chosenTasks.push(undoneTask);
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
        const taskCreationDay = new Date(task.createdAt).getDay();
        const currentDay = new Date().getDay();
        if (taskCreationDay === currentDay) {
          task.chosen = false;
        }
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
  completeTask,
  undoCompleteTask,
  undoChosenTask,
} = tasksSlice.actions;

// Export reducer
export default tasksSlice.reducer;
