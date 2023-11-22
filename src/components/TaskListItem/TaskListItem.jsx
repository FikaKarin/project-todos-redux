export const TaskListItem = ({
    task,
    handleToggleChosen,
    handleRemoveTask,
  }) => (
    <li key={task.id}>
      <input
        type='checkbox'
        checked={task.chosen || false}
        onChange={() => handleToggleChosen(task.id)}
      />
      {task.text} <p>Created on: {new Date(task.createdAt).toLocaleString()}</p>
      {task.readMoreLink && (
        <a href={task.readMoreLink} target='_blank' rel='noopener noreferrer'>
          Read more
        </a>
      )}
      <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
      {task.dueDate && (
        <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}
    </li>
  );
  