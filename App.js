import React from 'react';
import { StyleSheet, Button, View, Dimensions } from 'react-native';
import ProfileScreen from './src/ProfileScreen';
import AssassinateScreen from './src/AssassinateScreen';
import SignupScreen from './src/screens/SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

const App = () => {
  // const navState = useState({
  //   index: 0,
  //   routes: [
  //     { key: 'profile', title: 'Profile' },
  //     { key: 'assassinate', title: 'Assassinate' },
  //   ],
  // });

  //<View style={styles.container}>
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#051d3b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={({ navigation }) => ({
          headerLeft: () => (
            <Button
              onPress={() => navigation.navigate('AssassinateScreen')}
              title="Ass"
              color="#fff"
            />
          )
        })} />
        <Stack.Screen name="AssassinateScreen" component={AssassinateScreen} options={{
          headerLeft: ({ navigation }) => (
            <Button
              onPress={() => navigation.navigate('ProfileScreen')}
              title="Profile"
              color="#fff"
            />
          )
        }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <TabView
    //   navigationState={this.state}
    //   tabBarPosition="bottom"
    //   renderScene={SceneMap({
    //     profile: () => <ProfileScreen />,
    //     assassinate: () => <AssassinateScreen />,
    //   })}
    //   onIndexChange={index => this.setState({ index })}
    //   initialLayout={{ width: Dimensions.get('window').width }}
    // />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default App;
