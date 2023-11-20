import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTaskCompletion,
  removeTask,
  undoRemoveTask,
  startNewDay,
} from '../reducers/tasks';

export const TaskList = () => {
  const allTasks = useSelector((state) => state.tasks.allTasks);
  const removedTasks = useSelector((state) => state.tasks.removedTasks);
  const completedToday = useSelector((state) => state.tasks.completedToday);
  const dispatch = useDispatch();
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

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

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  const handleUndoRemoveTask = () => {
    dispatch(undoRemoveTask());
  };

  useEffect(() => {
    // Update the time remaining every second
    const timerId = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (now.getDate() !== localStorage.getItem('currentDay')) {
        dispatch(startNewDay());
        localStorage.setItem('currentDay', now.getDate());
      }
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, [dispatch]);

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

  return (
    <div>
      <h2>All Tasks</h2>
      <p>
        {completedToday.length}/{3} tasks completed today
      </p>
      {dailyLimitReached && (
        <p style={{ color: 'red' }}>
          Don't stress trying to un-stress. 3 tasks a day is enough to make a difference
        </p>
      )}
      <p>Time remaining until the list resets: {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</p>
      <ul>
        {allTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompletion(task.id)}
            />
            {task.text}{' '}
            {task.readMoreLink && (
              <a href={task.readMoreLink} target="_blank" rel="noopener noreferrer">
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
