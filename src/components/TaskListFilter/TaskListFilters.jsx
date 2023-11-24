import React from 'react';
import styled from 'styled-components';

export const TaskListFilters = ({
  showChosen,
  showUncompleted,
  setShowChosen,
  showUnchosen,
  setShowUnchosen,
  sortByDueDate,
  setSortByDueDate,
}) => (
  <TaskListFiltersWrapper>
    <label>
      Selected:
      <input
        type='checkbox'
        checked={showChosen}
        onChange={() => setShowChosen(!showChosen)}
      />
    </label>
    <label>
      Unselected:
      <input
        type='checkbox'
        checked={showUncompleted}
        onChange={() => setShowUnchosen(!showUnchosen)}
      />
    </label>
    <label>
      Due Date:
      <input
        type='checkbox'
        checked={sortByDueDate} 
        onChange={() => setSortByDueDate(!sortByDueDate)}
      />
    </label>
  </TaskListFiltersWrapper>
);

const TaskListFiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  label {
    margin: 16px 0px;
    font-size: 0.8rem;

    input {
      margin-right: 5px;
    }
  }
`;

