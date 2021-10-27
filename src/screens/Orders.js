import React, {Component, useEffect, useState} from 'react';
import {Text, View, ScrollView, TextInput, Image} from 'react-native';
import {colors} from '../constants/themes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {loginUser, signUpUser} from '../redux/actions/userAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icons, images} from '../constants/assets';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'native-base';
import {color} from 'react-native-reanimated';
import RenderHeader from './Header';

const Header = () => {
  let navigation = useNavigation();
  let guestID = useSelector((state) => state.UserReducer.guest_id);
  let user = useSelector((state) => state.UserReducer.userDetails);
  let [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    Axios.get(
      `https://thecodeditors.com/test/carobar/api-get-orders.php?user_id=${
        user ? user.Data[0].user_id : 0
      }&guest_id=${guestID}`,
    ).then((result) => {
    
      if (result.data.Data) {
        setCartItems(result.data.Data);
      } else {
        setCartItems(result.data);
      }
    });
  }, []);
  return (
    <View
      style={{
        width: '95%',
        height: 90,
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Entypo name="menu" size={30} />
      </TouchableOpacity>
      <View
        style={{
          width: '80%',
          borderRadius: 10,
          backgroundColor: colors.GREY.PRIMARY,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TextInput
          style={{width: '80%', paddingLeft: 10}}
          placeholder="Search Groceries Or Product"
        />
      </View>
      <Text
        style={{
          position: 'absolute',
          right: '-1%',
          top: '20%',
          fontSize: 12,
          backgroundColor: 'orange',
          borderRadius: 50,
          zIndex: 12,
          height: 20,
          width: 20,
          textAlign: 'center',
          paddingTop: 1,
        }}>
        {cartItems.length}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Image
          source={images.cart}
          style={{width: 30, height: 30}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};
let Login = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  let [data, setData] = useState(false);
  let user = useSelector((state) => state.UserReducer.userDetails);

  useEffect(() => {
    Axios.get(
      `https://thecodeditors.com/test/carobar/api-get-orders.php?user_id=${
        user ? user.Data[0].user_id : 0
      }`,
    ).then((result) => {
      let resp = result.data.Data;
      setData(resp);
    });
  }, []);

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
        <TouchableOpacity style={{marginRight: '5%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              fontFamily: 'sans-serif',
              color: 'black',
            }}>
            Orders
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: '98%',
          }}>
          {data &&
            data.map((item, key) => (
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  borderRadius: 1,
                  elevation: 1,
                  alignItems: 'center',
                  marginTop: '5%',
                  marginBottom: '10%',
                }}
                key={key}>
                <View style={{width: '90%', marginTop: '7%'}}>
                  <Icon
                    name="close"
                    type="AntDesign"
                    style={{fontSize: 18, marginLeft: 'auto'}}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 15,
                    }}>
                    <Image
                      source={{
                        uri: item.product_image
                      }}
                      style={{height: 70, width: 70, marginRight: 10}}
                    />
                    <Text
                      style={{color: 'black', fontSize: 18, paddingTop: 15}}>
                      {item.pro_name}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 14,
                      textAlign: 'center',
                      marginTop: 10,
                      textTransform: 'capitalize',
                    }}>
                    Shipping charges according to distance
                  </Text>
                  <Text
                    style={{
                      color: colors.ORANGE.SECONDARY,
                      fontSize: 14,
                      textAlign: 'center',
                      marginTop: 10,
                      textTransform: 'capitalize',
                    }}>
                    View Shipping Charges of vender
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 18,
                      textAlign: 'center',
                      marginTop: 10,
                    }}>
                    PKR {item.pro_price}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 18,
                      textAlign: 'center',
                      marginTop: 10,
                    }}>
                    {item.order_date}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 18,
                      textAlign: 'center',
                      marginTop: 10,
                    }}>
                    Status: {item.order_status}
                  </Text>

                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: colors.ORANGE.SECONDARY,
                      padding: 10,
                      width: '100%',
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                    onPress={() => navigation.navigate('OrderDetails', {item})}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.ORANGE.SECONDARY,
                        textAlign: 'center',
                      }}>
                      Order Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
        <View
          style={{
            width: '98%',
          }}>
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
                  label: 'Change Password',
                  function: () => navigation.navigate('ChangePassword'),
                },
                {
                  label: 'Logout',
                  function: () => {
                    dispatch({type: 'SIGN_OUT', payload: false});
                  },
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
                  key={key}
                  onPress={item.function}
                  >
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
