export const TaskListFilters = ({
  showCompleted,
  showUncompleted,
  setShowCompleted,
  setShowUncompleted,
  sortByDueDate, // Use the correct prop name
  setSortByDueDate,
}) => (
  <div>
    <label>
      Show Completed:
      <input
        type='checkbox'
        checked={showCompleted}
        onChange={() => setShowCompleted(!showCompleted)}
      />
    </label>
    <label>
      Show Uncompleted:
      <input
        type='checkbox'
        checked={showUncompleted}
        onChange={() => setShowUncompleted(!showUncompleted)}
      />
    </label>
    <label>
      Sort by Due Date:
      <input
        type='checkbox'
        checked={sortByDueDate} 
        onChange={() => setSortByDueDate(!sortByDueDate)}
      />
    </label>
  </div>
);
