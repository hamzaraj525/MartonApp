import React, { Component, useEffect, useState } from 'react';
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
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Toast
} from 'native-base';
import { colors } from '../constants/themes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { loginUser, signUpUser } from '../redux/actions/userAction';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images } from '../constants/assets';
import Axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { useDispatch, useSelector } from 'react-redux';

let Login = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  let [selected, setSelected] = useState('login');
  let [msg, setMsg] = useState(false);
  let [signUp, setSignUp] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  let [login, setLogIn] = useState({
    email: 'sameershk819@gmail.com',
    password: 'passcode1212',
  });

  const onLogin = async () => {
    setMsg(false);
    dispatch(loginUser(login));
  };
  const onSignUo = async () => {
    setMsg(false);
    dispatch(signUpUser(signUp));
  };

  let user = useSelector((state) => state.UserReducer.userDetails);
  let newMsg = useSelector((state) => state.UserReducer.msg);

  useEffect(() => {
    console.log(newMsg);
    if (newMsg === 'Successfully Login') {
      setMsg(newMsg);
      setTimeout(() => {
        navigation.navigate('HomeScreen');
      }, 1000);
    } else {
      setMsg(newMsg);
    }
  }, [user, newMsg]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.APPCOLOR.DEFAULT,
      }}>
      <SafeAreaView />
      <View
        style={{
          width: '95%',
          height: 90,
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back-outline'} size={30} />
        </TouchableOpacity>
        <Image
          source={require('../images/marton_logo.png')}
          resizeMode="contain"
          style={{ width: 100, height: 100 }}
        />
      </View>
      <View style={{ width: '100%', height: '86%' }}>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            height: '12%',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{ marginRight: '5%' }}
            onPress={() => setSelected('login')}>
            <Text
              style={{
                fontWeight: selected == 'login' ? 'bold' : '100',
                fontSize: 28,
                fontFamily: 'sans-serif',
                color: selected == 'login' ? 'black' : 'grey',
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: '8%' }}
            onPress={() => setSelected('signup')}>
            <Text
              style={{
                fontWeight: selected == 'signup' ? 'bold' : '100',
                fontSize: 28,
                fontFamily: 'sans-serif',
                color: selected == 'signup' ? 'black' : 'grey',
              }}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
        {selected == 'login' ? (
          <View
            style={{
              width: '90%',
              height: 300,
              alignSelf: 'center',
              borderRadius: 20,
              elevation: 2,
              alignItems: 'center',
              marginTop: '2%',
              backgroundColor: '#fff'
            }}>
            <View style={{ width: '90%', marginTop: '7%' }}>
              <Label
                style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                Email
              </Label>
              <View style={{
                backgroundColor: colors.GREY.PRIMARY,
                alignSelf: 'center',
                width: windowWidth * 0.8,
                borderRadius: 5,
                marginTop: 10
              }}>
                <TextInput
                  placeholderTextColor={'#000'}
                  placeholder={'Card Number'}
                  onChangeText={(text) => setLogIn({ ...login, email: text })}
                  value={login.email}
                  autoCapitalize="none"
                  keyboardType={'email-address'} style={{ width: windowWidth * 0.75, alignSelf: 'center' }} autoFocus={true} />
              </View>

              <View style={{ marginTop: 20 }}>
                <Label
                  style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                  Password
                </Label>
                <View style={{
                  backgroundColor: colors.GREY.PRIMARY,
                  alignSelf: 'center',
                  width: windowWidth * 0.8,
                  borderRadius: 5,
                  marginTop: 10
                }}>
                  <TextInput
                    placeholderTextColor={'#000'}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    value={login.password}
                    style={{ marginTop: '2%' }}
                    placeholder="Enter Your Secure Password"
                    onChangeText={(text) => setLogIn({ ...login, password: text })}
                    style={{ width: windowWidth * 0.75, alignSelf: 'center' }} />
                </View>
              </View>
              {msg ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 10,
                    textAlign: 'center',
                  }}>
                  {msg}
                </Text>
              ) : null}

              <View
                style={{
                  width: '95%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  marginTop: '10%',
                }}>
                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                  <Text style={{ fontSize: 20, color: 'dodgerblue' }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onLogin}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: '100',
                      color: colors.ORANGE.PRIMARY,
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              width: '90%',
              height: 400,
              alignSelf: 'center',
              borderRadius: 20,
              elevation: 2,
              alignItems: 'center',
              marginTop: '2%',
              backgroundColor: '#fff'
            }}>
            <View style={{ width: '90%', marginTop: '7%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 80,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Label
                    style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                    First Name
                  </Label>
                  <View style={{
                    backgroundColor: colors.GREY.PRIMARY,
                    alignSelf: 'flex-start',
                    width: windowWidth * 0.35,
                    borderRadius: 5,
                    marginTop: '6%'
                  }}>
                    <TextInput
                      placeholderTextColor={'#000'}
                      name="firstname"
                      onChangeText={(text) =>
                        setSignUp({ ...signUp, firstname: text })
                      }
                      placeholder={'First Name'}
                      keyboardType={'ascii-capable'} style={{ width: windowWidth * 0.30, alignSelf: 'center' }} />
                  </View>
                </View>
                <View>
                  <Label
                    style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                    Last Name
                  </Label>
                  <View style={{
                    backgroundColor: colors.GREY.PRIMARY,
                    alignSelf: 'flex-start',
                    width: windowWidth * 0.35,
                    borderRadius: 5,
                    marginTop: '6%'
                  }}>
                    <TextInput
                      placeholderTextColor={'#000'}
                      name="lastname"
                      onChangeText={(text) =>
                        setSignUp({ ...signUp, lastname: text })
                      }
                      placeholder={'Last Name'}
                      keyboardType={'ascii-capable'} style={{ width: windowWidth * 0.30, alignSelf: 'center' }} />
                  </View>
                </View>
              </View>

              <Item stackedLabel style={{ height: 80, marginTop: '4%' }}>
                <Label
                  style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                  Email
                </Label>
                <View style={{
                  backgroundColor: colors.GREY.PRIMARY,
                  alignSelf: 'center',
                  width: windowWidth * 0.8,
                  borderRadius: 5,
                  marginTop: 10
                }}>
                  <TextInput
                    placeholderTextColor={'#000'}
                    placeholder={'Enter Email Address'}
                    name="email"
                    onChangeText={(text) => setSignUp({ ...signUp, email: text })}
                    autoCapitalize="none"
                    keyboardType={'email-address'} style={{ width: windowWidth * 0.75, alignSelf: 'center' }} autoFocus={true} />
                </View>
              </Item>

              <View style={{ marginTop: 20 }}>
                <Label
                  style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                  Password
                </Label>
                <View style={{
                  backgroundColor: colors.GREY.PRIMARY,
                  alignSelf: 'center',
                  width: windowWidth * 0.8,
                  borderRadius: 5,
                  marginTop: 10
                }}>
                  <TextInput
                    placeholderTextColor={'#000'}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    style={{ marginTop: '2%' }}
                    placeholder="Enter Your Secure Password"
                    name="pass"
                    onChangeText={(text) =>
                      setSignUp({ ...signUp, password: text })
                    }
                    autoCapitalize="none"
                    style={{ width: windowWidth * 0.75, alignSelf: 'center' }} />
                </View>
              </View>
              {msg ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 10,
                    textAlign: 'center',
                    textTransform: 'capitalize',
                  }}>
                  {msg}
                </Text>
              ) : null}
              <View
                style={{
                  width: '95%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignSelf: 'center',
                  marginTop: '10%',
                }}>
                <TouchableOpacity onPress={onSignUo}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      color: colors.ORANGE.PRIMARY,
                    }}>
                    SIGN UP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Login;
