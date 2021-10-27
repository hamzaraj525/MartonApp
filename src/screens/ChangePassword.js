import React, {Component, useEffect, useState} from 'react';
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
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
} from 'native-base';
import {CommonActions, useNavigation} from '@react-navigation/native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import RenderHeader from './Header';
import Axios from 'axios';
import {useSelector} from 'react-redux';

let Login = () => {
  let navigation = useNavigation();
  let user = useSelector((state) => state.UserReducer.userDetails);
  let [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
  });
  let [msg, setMsg] = useState(false);
  let [error, setError] = useState(false);

  let form = [
    {
      label: 'Old Password ',
      placeholder: 'Old Password',
      function: (text) => setState({...state, oldPassword: text}),
    },

    {
      label: 'New Password ',
      placeholder: 'New Password',
      function: (text) => setState({...state, newPassword: text}),
    },
  ];

  const setPass = () => {
    if (state.oldPassword.length > 0 && state.newPassword.length > 0) {
      Axios.get(
        `https://thecodeditors.com/test/carobar/api-user-changepassword.php?id=${
          user ? user.Data[0].user_id : 0
        }&pass=${state.oldPassword}&passnew=${state.newPassword}`,
      ),
        then((res) => {
          if (res.data.status == 200) {
            setMsg("Password Has been changed");
            setTimeout(() => {
              setMsg(false);
            }, 2000);
          } else {
            setMsg(false);
          }
        });
    }else{
        setError("Please type password to set a new password");
        setTimeout(() => {
            setError(false);
          }, 2000);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <RenderHeader />
      <Text
        style={{padding: 10, borderRadius: 1, elevation: 1, marginBottom: 10}}>
        Home <Feather name="chevron-right" size={15} /> Change Password
      </Text>
      <ScrollView
        style={{
          width: '95%',
          height: '86%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={{marginRight: '5%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              fontFamily: 'sans-serif',
              color: 'black',
            }}>
            Change Password
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: '98%',
          }}>
          <View style={{width: '100%', marginTop: '4%'}}>
            {form.map((item, key) => (
              <View style={{marginBottom: 10}} key={key}>
                <Label style={{color: 'black', fontSize: 16, marginBottom: 10}}>
                  {item.label}
                </Label>
                <Item regular>
                  <Input
                    placeholder={item.placeholder}
                    autoCapitalize="none"
                    onChangeText={item.function}
                    secureTextEntry
                  />
                </Item>
              </View>
            ))}
            {msg && (
              <View style={{marginBottom: 10}}>
                <Label
                  style={{
                    color: 'green',
                    fontSize: 16,
                    marginBottom: 10,
                    textAlign: 'center',
                  }}>
                 {msg}
                </Label>
              </View>
            )}
            {error && (
              <View style={{marginBottom: 10}}>
                <Label
                  style={{
                    color: 'red',
                    fontSize: 16,
                    marginBottom: 10,
                    textAlign: 'center',
                  }}>
                 {error}
                </Label>
              </View>
            )}
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#fcb941',
                padding: 10,
                width: '100%',
                marginTop: 30,
              }}
              onPress={setPass}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fcb941',
                  textAlign: 'center',
                }}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View
            style={{
              width: '100%',
              alignSelf: 'center',
              borderRadius: 1,
              elevation: 1,
              alignItems: 'center',
              marginTop: '5%',
              marginBottom: '10%',
            }}>
            <View style={{width: '90%', marginTop: '7%'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                My Account
              </Text>
              {[
            {
              label: 'My Orders',
              function : ()=> navigation.navigate("CheckStatus")
            },
            {
              label: 'Change Password',
              function : ()=> alert('You are Current on this Screen')
            },
            {
              label: 'Logout',
              function : ()=> navigation.navigate("HomeScreen")
            },
              ].map((item, key) => (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#fcb941',
                    padding: 10,
                    width: '100%',
                    marginBottom: 20,
                  }}
                  key={key}
                  onPress={item.function}
                  >
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#fcb941',
                      textAlign: 'center',
                    }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
