import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ProfileScreen from './src/ProfileScreen';
import AssassinateScreen from './src/AssassinateScreen';


export default class App extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'profile', title: 'Profile' },
      { key: 'assassinate', title: 'Assassinate' },
    ],
  };

  render() {
    //<View style={styles.container}>
    return (
      <TabView
        navigationState={this.state}
        tabBarPosition="bottom"
        renderScene={SceneMap({
          profile: () => <ProfileScreen />,
          assassinate: () => <AssassinateScreen />,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
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
