import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Fab, Button, Icon, Header, Left, Right, Body, Title } from 'native-base';
import { MapView } from 'expo';
import { get } from 'object-path';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import BaseHeader from '../components/BaseHeader';
import BaseContainer from '../components/BaseContainer';

class Project extends Component {
  constructor(props) {
    super(props);
    this.onZoom = this.onZoom.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
  }
  state = {
    region: {
      latitude: 37.785834,
      longitude: -122.406417,
      latitudeDelta: 0.122,
      longitudeDelta: 28,
      centerIsSet: false
    }
  };
  static navigationOptions = ({ navigation }) => ({
    header: <BaseHeader navigation={navigation} goBack title={get(navigation, 'state.params.project.name') || ''} />
  });
  onRegionChange(region) {
    this.setState({ region });
  }
  onZoom(interval = 8) {
    this.setState({
      ...this.state,
      region: {
        ...this.state.region,
        longitudeDelta: this.state.region.longitudeDelta + interval,
        latitudeDelta: this.state.region.latitudeDelta + interval
      }
    });
  }
  componentWillUpdate(nextProps) {}
  render() {
    const { data } = this.props;
    const { loading, error, projects } = data;
    //  console.log(Object.keys(data));
    let project = false;

    if (projects && projects.length) {
      project = projects[0];
    }
    //  const project = projects[0];

    if (error) {
      return <Text>There was an error</Text>;
    }
    if (loading) {
      return <Text>Loading...</Text>;
    }
    return (
      <BaseContainer>
        {project && !loading && !error ? (
          <View>
            <MapView
              style={{
                height: 400
              }}
              region={this.state.region}
              onRegionChange={this.onRegionChange}
            >
              {project.dataPoints.map((point, i) => (
                <MapView.Marker
                  title={'how neat'}
                  description={'999'}
                  key={`map-${point.id}`}
                  coordinate={{
                    latitude: point.lat - i,
                    longitude: point.long + i
                  }}
                />
              ))}
            </MapView>
            <Text>name: {project.name}</Text>
            <Text>created: {project.createdAt}</Text>
            <Text>updated: {project.updatedAt}</Text>
            <Button iconRight light rounded>
              <Icon name="plus" />
              <Text>Add Data Point</Text>
            </Button>
          </View>
        ) : (
          <View />
        )}
      </BaseContainer>
    );
  }
}
{
  /* <Fab
  style={{ backgroundColor: '#5067FF' }}
  position="bottomRight"
  onPress={() =>
    this.props.navigation.navigate('CreateDataPoint', {
      project: {
        id: get(this.props, 'navigation.state.params.id', null),
        ...project
      },
      returnCallback: () => {
        return this.props.data.refetch();
      }
    })}
/> */
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
