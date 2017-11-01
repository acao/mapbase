/* global navigator */
import React, { Component } from 'react';
import { View, TextInput, Text, Button } from 'react-native';

import { get } from 'lodash';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Camera from '../components/Camera';

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
  openCamera = () => {
    this.props.navigation.navigate('Camera');
  };
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
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 12
        }}
      >
        <Button title="Get Location" onPress={this.geoLocate} />
        <Button title="Take Photos" onPress={this.openCamera} />
        <Button title="Attach Files" onPress={this.openCamera} />
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
            })
              .then(() => {
                this.props.navigation.state.params.returnCallback();
                this.props.navigation.goBack();
              })
              .catch(err => {
                console.error('there was an error submitting the data point', err);
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
