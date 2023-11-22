// TaskListHeader.jsx

import React from 'react';
import { useSelector } from 'react-redux';

export const TaskListHeader = ({ dailyLimitReached, timeRemaining }) => {
  const chosenTasks = useSelector((state) => state.tasks.chosenTasks);

  const chosenTaskCount = chosenTasks ? chosenTasks.length : 0;

  return (
    <div>
      <h2>All Tasks</h2>
      <p>{chosenTasks ? `${chosenTaskCount}/3` : '0/3'} tasks chosen today</p>
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
    </div>
  );
};
