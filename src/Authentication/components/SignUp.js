import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { Overlay } from 'react-native-elements';

import * as ImageManipulator from 'expo-image-manipulator';

import CameraView from '../../CameraView';

class SignUp extends Component {

  state = {
    cameraActive: false,
    username: '',
    name: '',
    file: null
  }

  onChangeUserName = (input) => {
    this.setState({ username: input });
  }

  onChangeName = (input) => {
    this.setState({ name: input });
  }

  activateCamera = () => {
    this.setState({ cameraActive: true });
  }

  closeCamera = () => {
    this.setState({ cameraActive: false })
  }

  handlePictureTaken = async (capturedPhoto) => {
    const { uri } = await ImageManipulator.manipulateAsync(capturedPhoto.uri, [{ rotate: 0 }]);
    this.setState({ cameraActive: false, file: uri });
  }

  onSubmit = () => {
    const { username, name, file } = this.state;

    const formData = new FormData();

    formData.append('File', { file, name: `${username}.jpg`, type: 'image/jpg' });
    formData.append('Username', username);
    formData.append('Name', name);

    this.props.registerUser(formData);
  }

  render() {
    const { username, name } = this.state;

    return (
      <View style={styles.container}>

        {this.state.cameraActive && (
          <Overlay isVisible fullScreen overlayBackgroundColor="black">
            <CameraView onClose={this.closeCamera} onPictureTaken={this.handlePictureTaken} selfie />
          </Overlay>
        )}

        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={text => this.onChangeUserName(text)}
          value={username}
        />

        <TextInput
          placeholder="name"
          style={styles.input}
          onChangeText={text => this.onChangeName(text)}
          value={name}
        />

        <Button
          title="Take your photo!"
          style={styles.button}
          onPress={this.activateCamera}
        />

        <Button
          style={styles.input}
          title="Submit"
          color="#777"
          onPress={this.onSubmit}
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    color: 'lightblue'
  },
  input: {
    marginBottom: 20,
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})

export default SignUp;
