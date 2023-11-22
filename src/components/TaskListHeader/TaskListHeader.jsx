export const TaskListHeader = ({ completedToday, dailyLimitReached, timeRemaining }) => (
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
    </div>
  );
  