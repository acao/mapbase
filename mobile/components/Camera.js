import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    return this.setState({ hasCameraPermission: status === 'granted' });
  }
  componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });
  }
  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        quality: 0.7,
        base64: true,
        exif: true
      });
      console.log(photo);
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-start',
                  alignItems: 'center'
                }}
                onPress={this.snap}
              >
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Photo </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
