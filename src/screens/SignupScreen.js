import React, { useState } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  AsyncStorage,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { launchImageLibraryAsync } from 'expo-image-picker';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { signup } from '../api';

const getButtonTyoe = (complete, loading) => {
  if (loading && !complete) {
    return 'loading';
  } else if (complete) {
    return 'success';
  }

  return 'primary';
}

const SignupScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      username: ''
    }
  });

  const onSubmit = async ({ username, name }) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('File', { uri: imageUri, name: 'profile.jpg', type: 'image/jpg' });
    formData.append('username', username);
    formData.append('name', name);
    console.log(formData);

    let res = {};
    try {
      res = await signup(formData);
    } catch(e) {
      setLoading(false);
    }
    const { status, data } = res;
    console.log('signup res', data);
    if (status === 'success') {
      setComplete(true);

      // AsyncStorage value has to be a string
      await AsyncStorage.setItem('signupCompleted', data?.user?._id);

      setTimeout(() => navigation.navigate('AssassinateScreen'), 1000)
    }
  };

  const onUploadPress = async () => {
    const { cancelled, uri } = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('image', uri);
    
    if(!cancelled) {
      setImageUri(uri);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableHighlight
        activeOpacity={0.6}
        onPress={onUploadPress}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.uploadedImage}
          />
        ): (
          <View style={styles.uploadCircle}>
            <Text>Choose picture</Text>
          </View>
        )}
      </TouchableHighlight>

      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.input}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Username"
              placeholderTextColor="#bbb"
              style={{ flex: 1, height: 50 }}
            />
          </View>
        )}
        name="username"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
         maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.input}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Name"
              placeholderTextColor="#bbb"
            />
          </View>
        )}
        name="name"
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        type={getButtonTyoe(complete, loading)}
      >
        Submit
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center'
  },
  input: {
    backgroundColor: '#fff',
    width: '80%',
    height: 54,
    marginBottom: 14,
    padding: 20,
    borderRadius: 4,
    fontSize: 16
  },
  uploadCircle: {
    borderRadius: 160,
    width: 160,
    height: 160,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  uploadedImage: {
    width: 160, 
    height: 160,
    marginBottom: 50,
    borderRadius: 160
  },
  button: {
    marginTop: 20
  }
});

export default SignupScreen;
