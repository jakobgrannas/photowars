import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import swordsIcon from './assets/swords.png';
import cameraIcon from './assets/camera.png';


class CameraView extends Component {
  static propTypes = {
    onPictureTaken: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      type: props.selfie ? Camera.Constants.Type.front : Camera.Constants.Type.back,
      photoUri: null
    };

    this.camera = React.createRef();
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async () => {
    this.setState({ takingPhoto: true })
    if(this.camera) {
      const photo = await this.camera.takePictureAsync({ exif: true });
      this.props.onPictureTaken(photo);

      // TODO: This shouldn't belong in the Camera component since it will be reused
      /*this.setState({
        photoUri: photo.uri
      });*/
    }
  }

  flipCamera = () => {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  }

  uploadPicture = () => {
    // TODO: Do something
  }

  cancelUpload = () => this.setState({ photoUri: null });

  cameraRef = ref => {
    this.camera = ref;
  }

  renderImagePopup() {
    return (
      <View style={styles.popupBackground}>
        <View style={styles.popup}>
          <Image style={styles.profilePic} source={{ uri: this.state.photoUri }} />
          <View style={styles.confirmButton}>
            <Button title="Confirm" color="#ffffff" onPress={this.uploadPicture} />
          </View>
          <View style={styles.cancelButton}>
            <Button title="Cancel" color="#777" onPress={this.cancelUpload} />
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return null;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          {this.state.photoUri && this.renderImagePopup()}
          <TouchableOpacity style={styles.closeButton} onPress={this.props.onClose || null}>
            <Text style={{ color: 'white', fontSize: 28 }}>x</Text>
          </TouchableOpacity>
          <Camera style={styles.camera} type={this.state.type} ref={this.cameraRef}>
            <View style={styles.controls}>
              <TouchableOpacity style={styles.shutterButton} onPress={this.takePicture}>
                <Image
                  style={styles.swords}
                  source={this.state.type === Camera.Constants.Type.back ? swordsIcon : cameraIcon}
                />
              </TouchableOpacity>

              {!this.props.selfie &&
                <TouchableOpacity style={styles.flipCamera} onPress={this.flipCamera}>
                  <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                </TouchableOpacity>
              }

            </View>
          </Camera>
        </View>
      );
    }
  }
}

const SHUTTER_BUTTON_SIZE = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },


  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },


  popupBackground: {
    position: 'absolute',
    zIndex: 200,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)',
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  popup: {
    height: '70%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePic: {
    marginTop: 20,
    width: '60%',
    height: '60%',
    maxWidth: 250,
    maxHeight: 250,
    borderColor: 'orange',
    borderWidth: 6,
    borderRadius: 4
  },
  confirmButton: {
    backgroundColor: '#27cc87',
    width: '90%',
    maxWidth: 200,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30
  },
  cancelButton: {
    backgroundColor: '#d2d2d2',
    width: '90%',
    maxWidth: 200,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 15
  },


  camera: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  controls: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  flipCamera: {
    position: 'absolute',
    right: 0,
    zIndex: 10,
  },
  shutterButton: {
    width: SHUTTER_BUTTON_SIZE,
    height: SHUTTER_BUTTON_SIZE,
    borderRadius: SHUTTER_BUTTON_SIZE/2,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  swords: {
    width: SHUTTER_BUTTON_SIZE - 20,
    height: SHUTTER_BUTTON_SIZE - 20,
    marginLeft: 10,
    marginTop: 10
  }
});

export default CameraView;
