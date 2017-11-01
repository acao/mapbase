import React from 'react';
import { Container } from 'native-base';

const BaseContainer = ({ children, ...rest }) => (
  <Container pinchGestureEnabled style={{ backgroundColor: 'white' }} {...rest}>
    {children}
  </Container>
);

export default BaseContainer;
