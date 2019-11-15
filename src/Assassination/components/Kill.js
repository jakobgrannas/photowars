import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";

class Kill extends React.Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 400,
            height: 400,
            backgroundColor: 'transparent',
          }}
          source={require('../../assets/clash-of-swords.json')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

export default Kill;
