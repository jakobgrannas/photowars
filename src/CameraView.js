import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  useWindowDimensions
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
// static propTypes = {
//   onPictureTaken: PropTypes.func.isRequired
// }

const CameraView = ({ onClose, onPictureTaken }) => {
  const { height, width: windowWidth } = useWindowDimensions();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  // constructor(props) {
  //   super(props);

  //   this.camera = React.createRef();
  // }

  // async componentDidMount() {
  //   const { status } = await Camera.requestCameraPermissionsAsync();
  //   this.setState({ hasCameraPermission: status === 'granted' });
  // }
  
  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then(({ status }) => {
      setHasCameraPermission(status === 'granted');
    });
  })

  const takePicture = useCallback(async () => {
    console.log('picture taken', cameraRef);
    if(cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ exif: true });
      onPictureTaken(photo);

      // TODO: This shouldn't belong in the Camera component since it will be reused
      /*this.setState({
        photoUri: photo.uri
      });*/
    }
  }, []);

  const flipCamera = useCallback(() => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  }, [type]);

  const uploadPicture = () => {
    // TODO: Do something
  }

  const cancelUpload = () => setPhotoUri(null);

  const renderImagePopup = useCallback(() => {
    return (
      <View style={styles.popupBackground}>
        <View style={styles.popup}>
          <Image style={styles.profilePic} source={{ uri: photoUri }} />
          <View style={styles.confirmButton}>
            <Button title="Confirm" color="#ffffff" onPress={uploadPicture} />
          </View>
          <View style={styles.cancelButton}>
            <Button title="Cancel" color="#777" onPress={cancelUpload} />
          </View>
        </View>
      </View>
    );
  }, [photoUri, uploadPicture, cancelUpload]);

  if (hasCameraPermission === null) {
    return null;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.container}>
        {photoUri && renderImagePopup()}
        <TouchableOpacity style={styles.closeButton} onPress={onClose || null}>
          <Text style={{ color: 'white', fontSize: 28 }}>x</Text>
        </TouchableOpacity>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.controls}>
            <ScrollView
              horizontal
              directionalLockEnabled
              style={styles.weaponScrollView}
              contentContainerStyle={styles.weaponViewContent}
              contentInset={{top: 0, left: windowWidth/2 - 60, bottom: 0, right: 0}}
            >
              <TouchableOpacity onPress={takePicture}>
                <Image source={require('../assets/pie.png')} style={styles.pie} />
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.flipCamera} onPress={flipCamera}>
              <MaterialIcons name="flip-camera-ios" size={32} style={{ marginRight: 20, marginBottom: 20 }} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

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
  weaponScrollView: {
    height: 80,
    flex: 1,
    marginBottom: 20
  },
  weaponViewContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pie: {
    width: 106.66,
    height: 63.33,
    resizeMode: 'contain',
  }
});

export default CameraView;
