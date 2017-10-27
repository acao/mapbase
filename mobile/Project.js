import React, { Component } from 'react';
import { View, ListView, Text, Button } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Project extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const project = this.props.data.projects && this.props.data.projects[0];
    return (
      <View>
        {project ? (
          <View>
            <Text>name: {project.name}</Text>
            <Text>created: {project.createdAt}</Text>
            <Text>updated: {project.updatedAt}</Text>
            <View>
              <Text>users:</Text>
              {project.users && project.users.map(user => <Text key={user.id}>{user.email} </Text>)}
            </View>
            <View>
              <Text>data points:</Text>
              {project.dataPoints &&
                project.dataPoints.map(data => (
                  <Text key={data.id}>
                    {data.lat} {data.long}
                  </Text>
                ))}
            </View>
            <Button
              title="Add Data Point"
              onPress={() =>
                this.props.navigation.navigate('CreateDataPoint', {
                  project: {
                    id: this.props.navigation.state.params.id,
                    ...project
                  }
                })}
            />
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

export default graphql(
  gql`
    query getOneProject($id: ID!) {
      projects: allProjects(filter: { id: $id }) {
        name
        users {
          id
          email
        }
        createdAt
        updatedAt
        dataPoints {
          id
          lat
          long
        }
      }
    }
  `,
  {
    options: props => ({
      variables: {
        id: props.navigation.state.params.id
      }
    })
  }
)(Project);
