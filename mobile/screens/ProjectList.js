import React, { Component } from 'react';
import { View, ListView, Text, Button } from 'react-native';
import { Container, Content, List, ListItem, Body, Right, Badge } from 'native-base';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import BaseContainer from '../components/BaseContainer';
import BaseHeader from '../components/BaseHeader';

class ProjectList extends Component {
  static navigationOptions = () => ({
    header: <BaseHeader title="Projects" />
  });
  render() {
    const { projects, refetch, meta, loading, error } = this.props.data;
    if (loading) {
      return <Text>Loading...</Text>;
    }
    if (error) {
      return <Text>Error...</Text>;
    }
    return (
      <BaseContainer>
        <Content>
          <Text>{meta && meta.count} Projects</Text>
          <Button title="Refresh" onPress={() => refetch()} />
          <List
            button
            dataArray={projects}
            renderRow={project => (
              <ListItem
                onPress={() =>
                  this.props.navigation.navigate('Project', {
                    id: project.id,
                    project: project
                  })}
              >
                <Body>
                  <Text key={project.id}>{`${project.name}`}</Text>
                </Body>
                <Right>
                  <Badge success>
                    <Text style={{ color: 'white' }}>{project.dataPoints.length}</Text>
                  </Badge>
                </Right>
              </ListItem>
            )}
          />
        </Content>
      </BaseContainer>
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
