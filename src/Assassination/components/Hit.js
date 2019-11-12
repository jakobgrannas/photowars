import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const Hit = ({ photoUri, onClose }) => {
  // Get photo and username of killed person
  // Get hit limit? Only allow one hit per day?
  // Back button to assinate screen
  return (
    <View style={styles.container}>
      <Text>It's a hit!</Text>
      <Image style={styles.killPic} source={{ uri: photoUri }} />
      <View style={styles.closeButton}>
        <Button title="Close" color="#777" onPress={onClose} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 200,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  killPic: {
    marginTop: 20,
    width: 250,
    width: 250,
    borderColor: 'orange',
    borderWidth: 6,
    borderRadius: 4
  },
  closeButton: {
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
})

export default Hit;
