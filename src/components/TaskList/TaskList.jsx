import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTaskChosen,
  removeTask,
  undoRemoveTask,
  startNewDay,
} from '../../reducers/tasks';
import { TaskListHeader } from '../TaskListHeader/TaskListHeader';
import { TaskListFilters } from '../TaskListFilter/TaskListFilters';
import { TaskListItem } from '../TaskListItem/TaskListItem';

// Define the TaskList component
export const TaskList = () => {
  // Retrieve necessary data from Redux store using useSelector
  const allTasks = useSelector((state) => state.tasks.allTasks);
  const chosenToday = useSelector((state) => state.tasks.chosenTasks);
  const removedTasks = useSelector((state) => state.tasks.removedTasks);
  const dispatch = useDispatch();
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());
  const [newTask, setNewTask] = useState({ text: '', dueDate: null });
  const [showChosen, setShowChosen] = useState(true);
  const [showUnchosen, setShowUnchosen] = useState(true);
  const [createdAfterDate, setCreatedAfterDate] = useState(null);
  const [sortByDueDate, setSortByDueDate] = useState(false);

  // useEffect: Load state from localStorage when the component mounts
  useEffect(() => {
    const savedState = localStorage.getItem('chosenTasks');
    if (savedState) {
      dispatch({
        type: 'LOAD_CHOSEN_TASKS',
        payload: JSON.parse(savedState),
      });
    }
  }, [dispatch]);

  // useEffect: Save chosen tasks to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chosenTasks', JSON.stringify(allTasks));
  }, [allTasks]);

  // useEffect: Update the time remaining every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (now.getDay() !== parseInt(localStorage.getItem('currentDay'), 10)) {
        dispatch(startNewDay());
        localStorage.setItem('currentDay', now.getDay().toString());
      }
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  // useEffect: Clear the timer interval to avoid memory leaks
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // Function to handle task completion toggling
  const handleToggleChosen = (taskId) => {
    if (chosenToday) {
      if (chosenToday.length < 3) {
        dispatch(toggleTaskChosen(taskId));
      } else {
        setDailyLimitReached(true);
        setTimeout(() => {
          setDailyLimitReached(false);
        }, 3000);
      }
    } else {
      // Handle the case where chosenToday is undefined
      console.error('chosenToday is undefined');
    }
  };

  // Function to handle task removal
  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  // Function to handle undoing task removal
  const handleUndoRemoveTask = () => {
    dispatch(undoRemoveTask());
  };

  // Function to calculate time remaining until the end of the day
  function getTimeRemaining() {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the current day

    const timeDiff = endOfDay - now;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  // JSX: Render the TaskList component
  return (
    <div>
      <TaskListHeader
        dailyLimitReached={dailyLimitReached}
        timeRemaining={timeRemaining}
        chosenToday={chosenToday}
      />
      <TaskListFilters
        showChosen={showChosen}
        showUnchosen={showUnchosen}
        setShowChosen={setShowChosen}
        setShowUnchosen={setShowUnchosen}
        setSortByDueDate={setSortByDueDate} // Pass this prop
      />
      <ul>
        {allTasks
          .filter(
            (task) =>
              (showChosen && task.chosen) || (showUnchosen && !task.chosen)
          )
          .filter(
            (task) =>
              !createdAfterDate || new Date(task.createdAt) > createdAfterDate
          )
          .sort((a, b) => {
            if (sortByDueDate) {
              return a.dueDate - b.dueDate; // Assuming dueDate is a Date object
            } else {
              return 0; // No sorting by due date
            }
          })
          .map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              handleToggleChosen={handleToggleChosen}
              handleRemoveTask={handleRemoveTask}
              handleUndoRemoveTask={handleUndoRemoveTask}
            />
          ))}
      </ul>
      {removedTasks.length > 0 && (
        <div>
          <h2>Removed Tasks</h2>
          <ul>
            {removedTasks.map((task) => (
              <li key={task.id}>
                {task.text}{' '}
                <button onClick={() => handleUndoRemoveTask()}>Undo</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
