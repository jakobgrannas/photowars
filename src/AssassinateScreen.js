import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import CameraView from './CameraView';
import { Hit, Kill } from './Assassination';
import { postKill } from './api';
import * as ImageManipulator from 'expo-image-manipulator';

class AssassinateScreen extends Component {
  state = {
    isHit: false,
    hitUsername: null,
    userPhotoUrl: null,
    showModal: false,
    takingPhoto: false,
    photoUri: null // This should come from the server
  };


  handlePictureTaken = async (capturedPhoto) => {
    this.setState({ takingPhoto: true });
    // Hack to fix a bug where the image is saved as Orientation: -90deg in portrait
    const { uri } = await ImageManipulator.manipulateAsync(capturedPhoto.uri, [{ rotate: 0 }]);

    const formData = new FormData();
    formData.append('File', { uri, name: 'kill.jpg', type: 'image/jpg' });

    console.log('formDatas', formData);

    postKill(formData)
      .then(({ data }) => {
        const { username, photo, isHit } = data || {};
        const photoUrl = photo && photo.url || null;
        console.log('yay, saved!', data);

        this.setState({
          hitUsername: username,
          isHit,
          userPhotoUrl: photoUrl,
          takingPhoto: false
        });
      })
      .catch(console.error);

  }

  handleModalClose = () => {
    if (this.state.isHit) {
      this.setState({ isHit: false });
    } else if(this.state.isMiss) {
      this.setState({ isMiss: false });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isHit && <Hit photoUri={this.state.photoUri} onClose={this.handleModalClose} />}
        {this.state.takingPhoto && <View style={styles.popupBackground}><Kill /></View>}
        <CameraView onPictureTaken={this.handlePictureTaken} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  popupBackground: {
    position: 'absolute',
    zIndex: 200,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default AssassinateScreen;
