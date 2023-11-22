import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../reducers/tasks';

export const TaskForm = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState(''); // Initialize with an empty string

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      dispatch(addTask({ id: Date.now(), text: newTask, completed: false, dueDate }));
      setNewTask('');
      setDueDate(''); // Clear due date after adding the task
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <input
        type='text'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='Enter task'
      />
      <label>
        Due Date:
        <input
          type='date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};
