import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import CameraView from './CameraView';
import { Hit } from './Assassination';

class AssassinateScreen extends Component {
  state = {
    isHit: false,
    showModal: false,
    photoUri: null // This should come from the server
  };


  handlePictureTaken = ({ uri, height, width }) => {
    console.log('photo url', uri);

    // TODO: Get hit or miss from server

    this.setState({
      isHit: true,
      photoUri: uri
    });
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
