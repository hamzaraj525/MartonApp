import React, { Component, useEffect } from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  TextInput,
  Image,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../constants/themes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { images } from '../constants/assets';
import { useDispatch, useSelector } from 'react-redux';

const Splash = ({ navigation }) => {
  let user = useSelector((state) => state.UserReducer.userDetails);
  useEffect(() => {
    console.log("user in splash");
    console.log(user);
    //   if (!user) {
    //   console.log("user in splash 1");

    //     setTimeout(
    //       () =>
    //         navigation.navigate("Login"),
    //       1000,
    //     );
    //   } else {
    //   console.log("user in splash 2");

    // }
    setTimeout(
      () =>
        navigation.navigate("HomeScreen"),
      1000,
    );
  }, [user]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.APPCOLOR.DEFAULT,
      }}>
      <Image source={require('../images/marton_logo.png')} style={{ width: 250, height: 250 }} resizeMode="contain" />
    </View>
  );
};

export default Splash;
