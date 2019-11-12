import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';

class ProfileScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>This is the profile screen</Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ProfileScreen;
