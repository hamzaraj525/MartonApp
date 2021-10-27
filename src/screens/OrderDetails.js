import React, {Component, useEffect, useState} from 'react';
import {Text, View, ScrollView, TextInput, Image} from 'react-native';
import {colors} from '../constants/themes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {loginUser, signUpUser} from '../redux/actions/userAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '../constants/assets';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-paper';
import RenderHeader from './Header';
import {Icon} from 'native-base';

let Login = ({route}) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  let {item} = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.APPCOLOR.DEFAULT,
      }}>
      <SafeAreaView />
      <RenderHeader />
      <ScrollView
        style={{
          width: '95%',
          height: '86%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={{marginLeft: '5%'}}>
          <Icon
            name="camera-off"
            type="Feather"
            style={{fontSize: 35, marginLeft: '3%'}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              fontFamily: 'sans-serif',
              color: 'black',
            }}>
            {item.user_name}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: '98%',
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              alignItems: 'center',
              marginBottom: '10%',
            }}>
            <View style={{width: '90%'}}>
              <Text style={{color: 'black', fontSize: 18, paddingTop: 15}}>
                Billing Information
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 16,
                  paddingTop: 5,
                  fontWeight: 'bold',
                }}>
                Noine
              </Text>
              {[
                `Full Name: ${item.user_name}`,

                `Email: ${item.user_email}`,
                `Phone: ${item.user_phone}`,
              ].map((item, key) => (
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 16,
                    marginTop: 10,
                    textTransform: 'capitalize',
                  }}
                  key={key}>
                  {item}
                </Text>
              ))}
              <Text style={{color: 'black', fontSize: 18, paddingTop: 15}}>
                Product Information
              </Text>
              {[
                `Product ID: ${item.pro_id}`,
                `Product Name: ${item.pro_name}`,

                `Quantity: ${item.order_qty}`,
                `Payment Method: ${item.payment}`,

                `Delivery Charges: ${item.pro_price}`,
              ].map((item, key) => (
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 16,
                    marginTop: 10,
                    textTransform: 'capitalize',
                  }}
                  key={key}>
                  {item}
                </Text>
              ))}
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  paddingTop: 5,
                  fontWeight: 'bold',
                }}>
                Total: ${item.pro_price}
              </Text>
            </View>
          </View>

          <View
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
                  label: 'Profile Setting',
                },
                {
                  label: 'My Orders',
                },
                {
                  label: 'Change Password',
                },
                {
                  label: 'Logout',
                },
              ].map((item, key) => (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.ORANGE.SECONDARY,
                    padding: 10,
                    width: '100%',
                    marginBottom: 20,
                  }}
                  key={key}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colors.ORANGE.SECONDARY,
                      textAlign: 'center',
                    }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
