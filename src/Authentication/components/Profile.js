import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Profile = ({ image, username }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.username} >{username}</Text>
      <Image style={styles.image} source={{uri: image}} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  username: {
    fontWeight: 'bold',
    fontSize: 40
  },
  image: {
    marginTop: 20,
    width: 250,
    height: 250,
    borderColor: 'orange',
    borderWidth: 6,
    borderRadius: 4
  }
})

export default Profile;
