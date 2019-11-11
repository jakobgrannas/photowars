import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from './src/Camera';

export default class App extends Component {
  state = {
    showCamera: true
  };

  handleClose = () => {
    this.setState({ showCamera: false });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showCamera && <Camera onClose={this.handleClose}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
