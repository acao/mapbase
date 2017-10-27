import React, { Component } from 'react';
import { View, ListView, Text, Button } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ProjectList extends Component {
  render() {
    console.log(this.props.data);
    const { projects, refetch, meta } = this.props.data;
    return (
      <View>
        <Text>{meta && meta.count} Projects</Text>
        <Button title="Refresh" onPress={() => refetch()} />
        <View>
          {projects &&
            projects.map(project => (
              <Button
                title={`${project.name} = ${project.dataPoints.length}`}
                key={project.id}
                onPress={() =>
                  this.props.navigation.navigate('Project', {
                    id: project.id,
                    project: project
                  })}
              />
            ))}
        </View>
      </View>
    );
  }
}

export default graphql(gql`
  query getProjects {
    projects: allProjects(orderBy: name_ASC) {
      id
      name
      createdAt
      updatedAt
      users {
        id
        email
      }
      dataPoints {
        id
        lat
        long
      }
    }
    meta: _allProjectsMeta {
      count
    }
  }
`)(ProjectList);
