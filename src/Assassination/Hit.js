import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet, Image, Button, Text } from 'react-native';
import colors from '../colors';

const Hit = ({ photoUri, onClose, username }) => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.setOptions({ headerShown: false }), 10);

    return () => navigation.setOptions({ headerShown: true });
  })
  // Get photo and username of killed person
  // Get hit limit? Only allow one hit per day?
  // Back button to assinate screen

  // TODO: Add different weapon types

  return (
    <View style={styles.container}>
      <Pressable onPress={onClose} style={{ flex: 1, alignItems: 'center' }}>
        <Image style={{ width: 307, height: 120, marginBottom: 20 }} source={require('../../assets/humblepie.png')} />
        <View style={styles.imageContainer}>
          <Image style={{ width: 300, height: 300 }} source={{ uri: photoUri }} />
          <Image style={styles.pie} source={require('../../assets/pie-face.png')} />
          <View style={styles.nameTag}>
            <Text style={{ fontSize: 16, marginRight: 4, color: '#fff'}}>Victim:</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
        </View>
        <View style={styles.closeButton}>
          <Button title="Tap to close" color="#fff" onPress={onClose} />
        </View>
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 200,
    width: '100%',
    height: '100%',
    backgroundColor: colors.darkPurple + 'e0',
    color: '#000',
    paddingTop: 140,
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
    width: '80%',
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden'
  },
  nameTag: {
    backgroundColor: colors.darkPurple,
    width: '80%',
    height: 40,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  pie: {
    width: 304,
    height: 234,
    position: 'absolute',
    left: 0,
    top: 40
  }
})

export default Hit;
