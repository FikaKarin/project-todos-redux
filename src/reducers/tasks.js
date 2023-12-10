import { configureStore, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import tasksData from '../tasks.json';

// Define a thunk to add a task asynchronously
export const addTaskAsync = (undoneTask) => (dispatch) => {
  // Assuming addTask is a synchronous action
  dispatch(addTask(undoneTask));
};

// Create a slice for tasks with initial state and reducers
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    allTasks: tasksData.map((task) => ({
      ...task,
      id: uuidv4(), // Use uuid to generate unique ID
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
    addTask: (state, action) => {
      const { text, dueDate } = action.payload;
      const newTask = {
        id: uuidv4(),
        text,
        chosen: false,
        createdAt: new Date().toISOString(),
        dueDate,
      };
      state.allTasks.push(newTask);
    },
    undoChosenTask: (state, action) => {
      const { taskId } = action.payload;
      const undoneTask = state.chosenTasks.find((task) => task.id === taskId);

      if (undoneTask) {
        // Update chosen property in allTasks array
        const taskIndex = state.allTasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          state.allTasks[taskIndex].chosen = false;
        }

        state.chosenTasks = state.chosenTasks.filter(
          (task) => task.id !== taskId
        );
        state.chosenToday = state.chosenToday.filter((id) => id !== taskId);
      }
    },
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
    undoRemoveTask: (state) => {
      const lastRemovedTask = state.removedTasks.pop();
      if (lastRemovedTask) {
        state.allTasks.push(lastRemovedTask);

        if (lastRemovedTask.chosen) {
          state.chosenTasks = state.chosenTasks.filter(
            (task) => task.id !== lastRemovedTask.id
          );

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
        state.chosenTasks = state.chosenTasks.filter(
          (task) => task.id !== taskId
        );

        const alreadyCompleted =
          state.completedTasks.findIndex((task) => task.id === taskId) !== -1;

        if (!alreadyCompleted) {
          state.completedTasks.push({
            ...taskToComplete,
            completedAt: new Date().toISOString(),
          });
        } else {
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
        state.completedTasks = state.completedTasks.filter(
          (task) => task.id !== taskId
        );

        undoneTask.completedAt = null;
        state.chosenTasks.push(undoneTask);
      }
    },
    toggleTaskChosen: (state, action) => {
      const taskId = action.payload;
      const task = state.allTasks.find((task) => task.id === taskId);

      if (task) {
        if (task.chosen) {
          state.chosenTasks = state.chosenTasks.filter(
            (chosenTask) => chosenTask.id !== taskId
          );
          state.chosenToday = state.chosenToday.filter((id) => id !== taskId);
        } else {
          if (state.chosenToday.length < state.dailyTaskLimit) {
            state.chosenTasks.push(task);
            state.chosenToday.push(task.id);
          } else {
            console.warn('Daily task limit reached!');
          }
        }
        task.chosen = !task.chosen;
      }
    },
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

// Create store instance locally
const store = configureStore({
  reducer: tasksSlice.reducer,
});

store.dispatch(undoChosenTask({ taskId: 'your-task-id' }));

