import React, { Component, useEffect, useState } from 'react';
import {
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
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Icon,
  Toast,
} from 'native-base';
import { colors } from '../constants/themes';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import { images, slider, cart } from '../constants/assets';

import { Card, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { cartList } from '../redux/actions/CatAction';

let total = 0;
const Cart = ({ route }) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  let { cartItemChanged } = route.params
  let guestID = useSelector((state) => state.UserReducer.guest_id);
  let user = useSelector((state) => state.UserReducer.userDetails);
  let [cartItems, setCartItems] = useState([]);
  let [deletedItem, setDelete] = useState(false);

  useEffect(() => {
    console.log(cartItemChanged);
    total = 0;
    Axios.get(
      `https://thecodeditors.com/test/carobar/api-get-cartshow.php?user_id=${user ? user.Data[0].user_id : 0
      }&guest_id=${guestID}`,
    ).then((result) => {
      if (result.data.Data) {
        setCartItems(result.data.Data);
        result.data.Data.forEach((element) => {
          total = total + parseInt(element.pro_price) * element.qty;
        });
      } else {
        setCartItems(result.data);
      }
    });
  }, [deletedItem, cartItemChanged]);

  const deleteItem = (item) => {
    Axios.get(
      `https://thecodeditors.com/test/carobar/api-get-cartdel.php?cart_id=${item}`,
    )
      .then((resp) => {
        if (resp.data.status == 200) {
          setDelete(!deletedItem);
        }
      })
      .then(() => {
        dispatch(cartList(guestID, user ? user.Data[0].user_id : 0));
      });
  };
  const increaseItem = (item) => {
    Axios.get(
      `https://thecodeditors.com/test/carobar/api-get-cartadd.php?guest_id=${guestID}&product_id=${item}&quantity=1&user_id=${user ? user.Data[0].user_id : 0
      }`,
    )
      .then((resp) => {
        if (resp.data.status == 200) {
          setDelete(!deletedItem);
        }
      })
      .then(() => {
        dispatch(cartList(guestID, user ? user.Data[0].user_id : 0));
      });
  };

  const RenderHeader = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 60,
          padding: 10,
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          elevation: 4
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'arrow-back-outline'} size={25} />
        </TouchableOpacity>
        <View
          style={{
            width: '80%',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              letterSpacing: 0.8,
            }}>
            My Cart
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Image
            source={images.home}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderCart = ({ item }) => {
    return (
      <View>
        <View
          style={{
            width: '100%',
            // height: 130,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 10,
          }}>
          <View
            style={{
              width: '70%',
              backgroundColor: '#fff',
              height: 120,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              elevation: 5,
              borderRadius: 20,

            }}>
            <Image
              source={{
                uri: `https://thecodeditors.com/test/marton/admin/plugin/product_images/${item.image_name}`,
              }}
              style={{ width: 100, height: 100, marginLeft: '8%', alignItems: 'center' }}
              resizeMode="contain"
            />
            <View style={{ width: '50%' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {item.pro_name}
              </Text>
              <Text>$ {item.pro_price}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '5%',
                  width: '95%',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '50%',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity>
                    <Image
                      source={images.minus}
                      style={{ width: 20, height: 20 }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: '5%' }}>{item.qty}</Text>
                  <TouchableOpacity onPress={() => increaseItem(item.pro_id)}>
                    <Image
                      source={images.plus}
                      style={{ width: 20, height: 20 }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => deleteItem(item.cart_id)}>
                  <Icon
                    type="MaterialCommunityIcons"
                    name="trash-can"
                    style={{ fontSize: 20, color: 'red' }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '20%',
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 18 }}>PKR {item.pro_price * item.qty}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>+</Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.APPCOLOR.DEFAULT,
      }}>
      <ScrollView contentContainerStyle={{ width: '100%', height: '100%' }}>
        <RenderHeader />
        <View style={{ width: '100%', height: '75%', flex: 1 }}>
          {cartItems.length > 0 ? (
            <FlatList
              data={cartItems}
              keyExtractor={({ _, i }) => String(i)}
              renderItem={renderCart}
            />
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Image resizeMode={'contain'} source={require('../images/emptycart.png')} style={{
                width: 200,
                height: 200,
                // backgroundColor: 'tomato',
                alignSelf: 'center',
              }} />
              <Text>No Item Added</Text>
            </View>
          )}
        </View>

      </ScrollView>
      <View
        style={{
          width: '100%',
          height: '12%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: '#eee'
        }}>
        <View>
          <Text>Total : Rs 400.00</Text>
        </View>
        <Button
          rounded
          style={{
            alignSelf: 'center',
            width: '30%',
            marginRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.ORANGE.DEFAULT,
          }}
          onPress={() => {
            if (!user) {
              navigation.navigate('Login', { total });
            } else if (cartItems.length >= 0) {
              navigation.navigate('Checkout', { total });
            } else {
              Toast.show({
                text: 'Please add an item before checkout.',
                buttonText: 'Okay',
                duration: 3000,
              });
            }
          }}>
          <Text style={{ padding: 10 }}>CHECKOUT</Text>
        </Button>

      </View>
    </View>
  );
};
export default Cart;
