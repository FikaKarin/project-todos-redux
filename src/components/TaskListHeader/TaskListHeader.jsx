import React from 'react';

export const TaskListHeader = ({
  title,
  count,
  chosenToday,
  dailyLimitReached,
  timeRemaining,
}) => (
  <div>
    <h2>{title} ({count}) </h2>
    <p>{chosenToday ? `${chosenToday.length}/3` : '0/3'} tasks chosen today</p>
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
