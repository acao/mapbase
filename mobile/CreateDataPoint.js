/* global navigator */
import React, { Component } from 'react';
import { View, TextInput, Text, Button } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreateDataPoint extends Component {
  constructor(props) {
    super(props);
    this.geoLocate = this.geoLocate.bind(this);
    this.changeText = this.changeText.bind(this);
    this.state = {
      lat: '0.0',
      long: '0.0'
    };
  }
  geoLocate() {
    navigator.geolocation.getCurrentPosition(
      geo => this.setState(this.getGeoData(geo)),
      () => this.setState({ lat: '0.0', long: '0.0' })
    );
  }
  getGeoData(resp) {
    const { latitude, longitude } = resp.coords;
    return { lat: latitude.toString(), long: longitude.toString() };
  }
  changeText(field) {
    return event => {
      this.setState({ [field]: event.toString() });
    };
  }
  render() {
    const { mutate } = this.props;
    const { project } = this.props.navigation.state.params;
    console.log(this.state);
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 12
        }}
      >
        <Button title="Get Location" onPress={this.geoLocate} />
        <Text>Lat</Text>
        <TextInput keyboardType="decimal-pad" editable value={this.state.lat} onChangeText={this.changeText('lat')} />
        <Text>Long</Text>
        <TextInput keyboardType="decimal-pad" editable value={this.state.long} onChangeText={this.changeText('long')} />
        <Text>Notes</Text>
        <TextInput editable multiline onChangeText={this.changeText('notes')} />
        <Button
          title="Create"
          onPress={() =>
            mutate({
              variables: {
                project: project.id,
                lat: parseFloat(this.state.lat),
                long: parseFloat(this.state.long)
              }
            }).then(() => {
              console.log(this.props.navigation);
              this.props.navigation.goBack();
            })}
        />
      </View>
    );
  }
}

export default graphql(gql`
  mutation CreateDataPointMutation($project: ID!, $lat: Float!, $long: Float!) {
    createDataPoint(lat: $lat, long: $long, projectId: $project) {
      id
      lat
      long
      project {
        id
        name
      }
    }
  }
`)(CreateDataPoint);
