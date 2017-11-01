import React from 'react';

import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';

const BaseHeader = ({ navigation = false, goBack = false, title = false, renderRightMenu = false }) => (
  <Header>
    <Left>
      {goBack && (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>
      )}
    </Left>
    <Body>{title && <Title>{title}</Title>}</Body>
    <Right>{renderRightMenu && renderRightMenu()}</Right>
  </Header>
);

export default BaseHeader;
