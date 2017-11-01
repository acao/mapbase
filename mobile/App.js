import React from 'react';
import { AppRegistry, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { StackNavigator } from 'react-navigation';
import Project from './screens/Project';
import ProjectList from './screens/ProjectList';
import CreateDataPoint from './screens/CreateDataPoint';
import Camera from './components/Camera';

import store from './store';

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
  },
  Camera: {
    navigationOptions: {
      headerTitle: 'Camera'
    },
    path: 'data-point/create/camera',
    screen: Camera
  }
});

// const hasSubscriptionOperation = ({ query: { definitions } }) =>
//   definitions.some(({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription');
//
// const link = ApolloLink.split(
//   // hasSubscriptionOperation,
//   // new WebSocketLink({
//   //   uri: 'ws://localhost:60000/subscriptions/v1/cj999ixnc00080145xgljzi6c',
//   //   options: { reconnect: true }
//   // }),
//   new HttpLink({
//     uri: 'http://5ab1cd54.ngrok.io/simple/v1/cj999ixnc00080145xgljzi6c'
//   })
// );
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://5887052b.ngrok.io/simple/v1/cj999ixnc00080145xgljzi6c'
  }),
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider
    style={{
      backgroundColor: 'white'
    }}
    client={client}
    store={store}
  >
    <ModalStack
      style={{
        backgroundColor: 'white'
      }}
    />
  </ApolloProvider>
);

export default App;
