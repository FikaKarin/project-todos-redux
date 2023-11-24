import React from 'react';
import styled from 'styled-components';

export const TaskListHeader = ({ title, count, chosenToday, dailyLimitReached, timeRemaining }) => (
  <TaskListHeaderWrapper>
    <h2>{title} ({count}) </h2>
    <p>{chosenToday ? `${chosenToday.length}/3` : '0/3'} tasks chosen today</p>
    {dailyLimitReached && (
      <p className="error-message">
        Don't stress trying to un-stress. 3 tasks a day is enough to make a difference
      </p>
    )}
    <p className='time'>
      List resets: {timeRemaining.hours}h{' '}
      {timeRemaining.minutes}m {timeRemaining.seconds}s
    </p>
  </TaskListHeaderWrapper>
);

const TaskListHeaderWrapper = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .time {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .error-message {
    color: red;
  }
`;

