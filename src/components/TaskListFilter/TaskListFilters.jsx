export const TaskListFilters = ({
  showChosen,
  showUncompleted,
  setShowChosen,
  showUnchosen,
  setShowUnchosen,
  sortByDueDate, // Use the correct prop name
  setSortByDueDate,
}) => (
  <div>
    <label>
      Show Selected:
      <input
        type='checkbox'
        checked={showChosen}
        onChange={() => setShowChosen(!showChosen)}
      />
    </label>
    <label>
      Show Unselected:
      <input
        type='checkbox'
        checked={showUncompleted}
        onChange={() => setShowUnchosen(!showUnchosen)}
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
