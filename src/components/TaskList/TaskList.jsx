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
import { FaUndo } from 'react-icons/fa';

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
        }, 8000);
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
          <StyledRemovedTaskList>
            {removedTasks.map((task) => (
              <li key={task.id}>
                <RemovedTaskText>{task.text}</RemovedTaskText>
                <FaUndoButton onClick={handleUndoRemoveTask} />
              </li>
            ))}
          </StyledRemovedTaskList>
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
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 200;
    margin-bottom: 10px;
  }
`;
const StyledRemovedTaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

const RemovedTaskText = styled.p`
  font-size: 0.8rem;
  text-decoration: line-through;
  color: #888;
  margin-bottom: 5px;
`;

const FaUndoButton = styled(FaUndo)`
  display:flex;
  color: black;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 8px; // Adjusted padding
  border-radius: 4px;
  cursor: pointer;
  font-size: 33px; // Increased font size
  margin-left: auto; // Move to the right
  margin-right: 8px; // Add some space between buttons
  margin-top: 12px;
  margin-bottom: 8px; // Add space between buttons and the bottom
  transition: ease-in 0.3s;

  &:hover {
    transition: ease-in 0.3s;
  }
`;
