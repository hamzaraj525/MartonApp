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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { images } from '../constants/assets';
import Axios from 'axios';
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
          source={images.logo}
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
              Forgot Password
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{marginRight: '8%'}}
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
          </TouchableOpacity> */}
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
              <Item stackedLabel style={{ height: 80 }}>
                <Label
                  style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                  EMAIL
                </Label>
                {/* <Input
                  autoCapitalize="none"
                  style={{ marginTop: '2%' }}
                  placeholder="Enter Your Email"
                  onChangeText={(text) => setLogIn({ ...login, email: text })}
                  value={login.email}
                /> */}
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
              </Item>
              {/* <Item stackedLabel style={{height: 80, marginTop: '4%'}}>
                <Label
                  style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                  PASSWORD
                </Label>
                <Input
                  secureTextEntry
                  value={login.password}
                  style={{marginTop: '2%'}}
                  placeholder="Enter Your Secure Password"
                  onChangeText={(text) => setLogIn({...login, password: text})}
                />
              </Item> */}
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
                {/* <TouchableOpacity>
                  <Text style={{fontSize: 20, color: colors.BLUE.DEFAULT}}>
                    FORGET PASSWORD?
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={onLogin}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      color: colors.ORANGE.PRIMARY,
                    }}>
                    Send Details
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
              elevation: 1,
              alignItems: 'center',
              marginTop: '2%',
            }}>
            <View style={{ width: '90%', marginTop: '7%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 80,
                  justifyContent: 'space-between',
                }}>
                <Item stackedLabel style={{ height: 80, width: '40%' }}>
                  <Label
                    style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                    FIRST NAME
                  </Label>
                  <Input
                    style={{ marginTop: '2%' }}
                    placeholder="Your First Name"
                    name="firstname"
                    onChangeText={(text) =>
                      setSignUp({ ...signUp, firstname: text })
                    }
                  />
                </Item>
                <Item stackedLabel style={{ height: 80, width: '40%' }}>
                  <Label
                    style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                    LAST NAME
                  </Label>
                  <Input
                    style={{ marginTop: '2%' }}
                    placeholder="Your Last Name"
                    name="lastname"
                    onChangeText={(text) =>
                      setSignUp({ ...signUp, lastname: text })
                    }
                  />
                </Item>
              </View>

              <Item stackedLabel style={{ height: 80, marginTop: '4%' }}>
                <Label
                  style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                  EMAIL
                </Label>
                <Input
                  style={{ marginTop: '2%' }}
                  placeholder="Enter Your Email"
                  name="email"
                  onChangeText={(text) => setSignUp({ ...signUp, email: text })}
                />
              </Item>
              <Item stackedLabel style={{ height: 80, marginTop: '4%' }}>
                <Label
                  style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                  PASSWORD
                </Label>
                <Input
                  secureTextEntry
                  style={{ marginTop: '2%' }}
                  placeholder="Enter Your Secure Password"
                  name="pass"
                  onChangeText={(text) =>
                    setSignUp({ ...signUp, password: text })
                  }
                />
              </Item>
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
