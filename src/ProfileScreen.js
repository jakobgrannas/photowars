import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { addUser } from './api';
import { SignUp, Profile } from './Authentication';

class ProfileScreen extends Component {
  state = {
    authenticated: false,
    username: '',
    image: 'https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg'
  }

  registerUser = (formData) => {
    addUser(formData)
      .then(({ data }) => {
        this.setState({
          authenticated: true,
          username: data.user.username
          // image: data.user.photo.url => NEED RIGHT URL
        })
      })
      .catch(console.error);
  }

  render() {
    const { username, image, authenticated } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {authenticated ? <Profile username={username} image={image}/> : <SignUp registerUser={this.registerUser}/>}
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
