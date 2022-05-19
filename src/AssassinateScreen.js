import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import CameraView from './CameraView';
import { Hit } from './Assassination';
import { postKill } from './api';
import * as ImageManipulator from 'expo-image-manipulator';
import { API_BASE_URL } from '@env';

class AssassinateScreen extends Component {
  state = {
    isHit: false,
    hitUsername: null,
    userPhotoUrl: null,
    showModal: false,
  };


  handlePictureTaken = async (capturedPhoto) => {
    // Hack to fix a bug where the image is saved as Orientation: -90deg in portrait
    const { uri } = await ImageManipulator.manipulateAsync(capturedPhoto.uri, [{ rotate: 0 }]);

    console.log('uri', uri);

    const formData = new FormData();
    formData.append('File', { uri, name: 'kill.jpg', type: 'image/jpg' });

    // TODO: Save kill for assassin
    // formData.append('assassinUserId', )


    console.log('formDatas', formData);

    postKill(formData)
      .then(({ data }) => {
        const { username, photoUrl, isHit } = data || {};
        const url = photoUrl ? `${API_BASE_URL}/${photoUrl}` : null;
        console.log('yay, saved!', data, url);

        this.setState({
          hitUsername: username,
          isHit,
          userPhotoUrl: url
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
        {this.state.isHit && <Hit photoUri={this.state.userPhotoUrl} username={this.state.hitUsername} onClose={this.handleModalClose} />}
        {/* {<Hit photoUri={this.state.userPhotoUrl} onClose={this.handleModalClose} />} */}
        <CameraView onPictureTaken={this.handlePictureTaken} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default AssassinateScreen;
