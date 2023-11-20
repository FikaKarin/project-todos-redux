import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTaskCompletion,
  removeTask,
  undoRemoveTask,
  startNewDay,
} from '../reducers/tasks';

// Define the TaskList component
export const TaskList = () => {
  // Retrieve necessary data from Redux store using useSelector
  const allTasks = useSelector((state) => state.tasks.allTasks);
  const completedToday = useSelector((state) => state.tasks.completedToday);
  const removedTasks = useSelector((state) => state.tasks.removedTasks);
  const dispatch = useDispatch();
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  // useEffect: Load state from localStorage when the component mounts
  useEffect(() => {
    const savedState = localStorage.getItem('completedTasks');
    if (savedState) {
      dispatch({
        type: 'LOAD_COMPLETED_TASKS',
        payload: JSON.parse(savedState),
      });
    }
  }, [dispatch]);

  // useEffect: Save completed tasks to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(allTasks));
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
  const handleToggleCompletion = (taskId) => {
    if (completedToday.length < 3) {
      dispatch(toggleTaskCompletion(taskId));
    } else {
      setDailyLimitReached(true);
      setTimeout(() => {
        setDailyLimitReached(false);
      }, 3000);
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
      <h2>All Tasks</h2>
      <p>
        {completedToday.length}/{3} tasks completed today
      </p>
      {dailyLimitReached && (
        <p style={{ color: 'red' }}>
          Don't stress trying to un-stress. 3 tasks a day is enough to make a
          difference
        </p>
      )}
      <p>
        Time remaining until the list resets: {timeRemaining.hours}h{' '}
        {timeRemaining.minutes}m {timeRemaining.seconds}s
      </p>
      <ul>
        {allTasks.map((task) => (
          <li key={task.id}>
            <input
              type='checkbox'
              checked={task.completed}
              onChange={() => handleToggleCompletion(task.id)}
            />
            {task.text}{' '}
            {task.readMoreLink && (
              <a
                href={task.readMoreLink}
                target='_blank'
                rel='noopener noreferrer'
              >
                Read more
              </a>
            )}
            <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
          </li>
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