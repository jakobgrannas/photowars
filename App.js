import React, { useEffect, useState } from 'react';
import { StatusBar, Button, AsyncStorage } from 'react-native';
import ProfileScreen from './src/ProfileScreen';
import AssassinateScreen from './src/AssassinateScreen';
import SignupScreen from './src/screens/SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  const [signupCompleted, setSignupCompleted] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('signupCompleted').then((userId) => {
      if (Boolean(userId)) {
        setSignupCompleted(true)
      }
    });
  });

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
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
        {!signupCompleted && (
          <Stack.Screen name="SignupScreen" component={SignupScreen} options={({ navigation }) => ({
            title: 'Signup',
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate('AssassinateScreen')}
                title="Ass"
                color="#fff"
              />
            )
          })} />
        )}
        <Stack.Screen name="AssassinateScreen" component={AssassinateScreen} options={{
          title: 'Assassin mode',
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
  );
}

export default App;
