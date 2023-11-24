import React from 'react';
import { Header } from '../Header/Header';
import { TaskForm } from '../Taskform/TaskForm';
import styled from 'styled-components';

export const TopContainer = () => {
  return (
    <TopWrapper>
      <Header />
      <TaskForm />
    </TopWrapper>
  );
};

const TopWrapper = styled.div`
  background-color: #ffffff8f;
  padding: 6px;
  margin: 16px 0px;
  border-radius: 4px;
  box-shadow: 2px 2px 4px black;
  max-width: 600px;
  margin: 0 auto;
`;
