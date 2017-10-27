import React from 'react';
import { AppRegistry, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { StackNavigator } from 'react-navigation';
import Project from './Project';
import ProjectList from './ProjectList';
import CreateDataPoint from './CreateDataPoint';

const ModalStack = StackNavigator({
  Home: {
    screen: ProjectList,
    navigationOptions: {
      headerTitle: 'Projects'
    }
  },
  Project: {
    navigationOptions: {
      headerTitle: 'Project :id'
    },
    path: 'project/:id',
    screen: Project
  },
  CreateDataPoint: {
    navigationOptions: {
      headerTitle: 'Create Data Point'
    },
    path: 'data-point/create',
    screen: CreateDataPoint
  }
});

const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription');

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new WebSocketLink({
    uri: 'ws://localhost:60000/subscriptions/v1/cj999ixnc00080145xgljzi6c',
    options: { reconnect: true }
  }),
  new HttpLink({
    uri: 'http://localhost:60000/simple/v1/cj999ixnc00080145xgljzi6c'
  })
);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <ModalStack />
  </ApolloProvider>
);

export default App;
