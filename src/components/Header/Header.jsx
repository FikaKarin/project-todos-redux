import React from 'react';
import styled from 'styled-components';

export const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Make Time - To Calm Down</h1>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  h1 {
    font-weight: 200;
  }
`;
