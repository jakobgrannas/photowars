import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';
import colors from '../colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const Button = ({ onPress, style, type, children }) => {

  let backgroundColor = colors.pink;

  switch(type) {
    case 'success':
      backgroundColor = colors.success;
      break;
    // case 'loading':
    //   backgroundColor = '#ddd';
    //   break;
    case 'primary':
      backgroundColor = colors.pink;
      break;
  }

  return (
    <TouchableHighlight
      style={{
        ...styles.submitButton,
        ...{ backgroundColor },
        ...style
      }}
      underlayColor={colors.darkPink}
      activeOpacity={1}
      onPress={onPress}
    >
      <View>
      {type === 'primary' && (
        <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>{children}</Text>
      )}
      {type === 'success' && (
        <Ionicons name="md-checkmark" size={40} color="white" />
      )}
      {type === 'loading' && (
        <ActivityIndicator size="small" color="#fff" />
      )}
      </View>
    </TouchableHighlight>
  )
};

const styles = StyleSheet.create({
  submitButton: {
    color: '#fff',
    height: 60,
    borderRadius: 40,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Button;
