import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  toggleTaskChosen,
  removeTask,
  undoRemoveTask,
  startNewDay,
} from '../../reducers/tasks';

import { TaskListHeader } from '../TaskListHeader/TaskListHeader';
import { TaskListFilters } from '../TaskListFilter/TaskListFilters';
import { TaskListItem } from '../TaskListItem/TaskListItem';

export const TaskList = () => {
  const allTasks = useSelector((state) => state.tasks.allTasks);
  const chosenToday = useSelector((state) => state.tasks.chosenTasks);
  const removedTasks = useSelector((state) => state.tasks.removedTasks);
  const dispatch = useDispatch();
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());
  const [newTask, setNewTask] = useState({ text: '', dueDate: null });
  const [showChosen, setShowChosen] = useState(true);
  const [showUnchosen, setShowUnchosen] = useState(true);
  const [createdAfterDate, setCreatedAfterDate] = useState(null);
  const [sortByDueDate, setSortByDueDate] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('chosenTasks');
    if (savedState) {
      dispatch({
        type: 'LOAD_CHOSEN_TASKS',
        payload: JSON.parse(savedState),
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('chosenTasks', JSON.stringify(allTasks));
  }, [allTasks]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (now.getDay() !== parseInt(localStorage.getItem('currentDay'), 10)) {
        dispatch(startNewDay());
        localStorage.setItem('currentDay', now.getDay().toString());
      }
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleToggleChosen = (taskId) => {
    if (chosenToday) {
      if (chosenToday.length < 3) {
        dispatch(toggleTaskChosen(taskId));
      } else {
        setDailyLimitReached(true);
        setTimeout(() => {
          setDailyLimitReached(false);
        }, 3000);
      }
    } else {
      console.error('chosenToday is undefined');
    }
  };

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  const handleUndoRemoveTask = () => {
    dispatch(undoRemoveTask());
  };

  function getTimeRemaining() {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const timeDiff = endOfDay - now;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  return (
    <TaskListWrapper>
      <TaskListHeader
        title='All Tasks'
        count={allTasks.length}
        dailyLimitReached={dailyLimitReached}
        timeRemaining={timeRemaining}
        chosenToday={chosenToday}
      />
      <TaskListFilters
        showChosen={showChosen}
        showUnchosen={showUnchosen}
        setShowChosen={setShowChosen}
        setShowUnchosen={setShowUnchosen}
        setSortByDueDate={setSortByDueDate}
      />
      <ul>
        {allTasks
          .filter(
            (task) =>
              (showChosen && task.chosen) || (showUnchosen && !task.chosen)
          )
          .filter(
            (task) =>
              !createdAfterDate || new Date(task.createdAt) > createdAfterDate
          )
          .sort((a, b) => {
            if (sortByDueDate) {
              return a.dueDate - b.dueDate;
            } else {
              return 0;
            }
          })
          .map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              handleToggleChosen={handleToggleChosen}
              handleRemoveTask={handleRemoveTask}
              handleUndoRemoveTask={handleUndoRemoveTask}
            />
          ))}
      </ul>
      {removedTasks.length > 0 && (
        <div>
          <h2>Removed Tasks</h2>
          <ul>
            {removedTasks.map((task) => (
              <li key={task.id}>
                {task.text}{' '}
                <button onClick={() => handleUndoRemoveTask()}>Undo</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </TaskListWrapper>
  );
};

const TaskListWrapper = styled.div`
  margin: 0 auto;
  width: 100%;

  ul {
    list-style: none;
    padding: 0px;
    flex-direction: column;
    align-items: center;
  }

  li {
    width: 90%;
    box-sizing: border-box; /* Include padding and border in the element's total width */
    margin-bottom: 20px;
    border-radius: 4px;
    font-family: 'Helvetica', sans-serif;

    &:last-child {
      margin-bottom: 0;
    }

    input {
      margin-right: 8px;
    }

    label {
      font-weight: 600;
    }

    p {
      font-size: 0.8rem;
      color: black;
    }

    button {
      margin-left: 8px;
      background-color: #ff5757;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: 'Helvetica', sans-serif;

      &:hover {
        background-color: #d14848;
      }
    }
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;
