import React from 'react';

export const NewTaskDueDate = ({ newTask, setNewTask }) => (
  <label>
    Due Date for New Task:
    <input
      type='date'
      value={newTask.dueDate || ''}  //Use an empty string if newTask.dueDate is null
      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
    />
  </label>
);

