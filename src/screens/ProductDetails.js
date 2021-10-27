import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { Button, Text, Toast } from 'native-base';
import { colors } from '../constants/themes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { images, slider } from '../constants/assets';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { cartList } from '../redux/actions/CatAction';

const ProductDetail = ({ route }) => {
  let navigation = useNavigation();
  let { item } = route.params;
  let [qty, setQty] = useState(1);
  let [msg, setMsg] = useState(false);
  let guestID = useSelector((state) => state.UserReducer.guest_id);
  let user = useSelector((state) => state.UserReducer.userDetails);
  let dispatch = useDispatch();
  let cartReducer = useSelector((state) => state.CatReducer.cartItems);
  let [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    dispatch(cartList(guestID, user ? user.Data[0].user_id : 0));
  }, []);
  useEffect(() => {
    setCartItems(cartReducer);
  }, [cartReducer]);
  useEffect(() => {
    if (qty > 1) {
      setMsg(true);
      setTimeout(() => {
        setMsg(false);
      }, 3000);
    }
  }, [qty]);

  const addItemIntoCart = async () => {
    let result = await axios.get(
      `https://thecodeditors.com/test/carobar/api-get-cartadd.php?guest_id=${guestID}&product_id=${item.pro_id
      }&quantity=${qty}&user_id=${user ? user.Data[0].user_id : 0}`,
    );
    dispatch(cartList(guestID, user ? user.Data[0].user_id : 0));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.APPCOLOR.DEFAULT,
      }}>
      <SafeAreaView />
      <View style={{ width: '100%', height: '99%' }}>
        {/* Header Start */}
        <View
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 10,
            height: 60,
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            elevation: 3

          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Categories')}>
            <Ionicons name={'arrow-back-outline'} size={30} />
          </TouchableOpacity>
          <View
            style={{
              width: '80%',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                letterSpacing: 0.8,
              }}>
              Categories
            </Text>
          </View>

          <Text
            style={{
              position: 'absolute',
              right: '1%',
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Cart', { cartItemChanged: cartItems })
            }>
            <Image
              source={images.cart}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* Header End */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: '100%', height: '100%' }}>
          <View style={{ width: '100%' }}>

            <View
              style={{
                width: '90%',
                height: 500,
                alignSelf: 'center',
                elevation: 4,
                backgroundColor: '#fff',
                borderRadius: 10
              }}>
              <Image resizeMode={'contain'}
                source={{
                  uri: `https://thecodeditors.com/test/marton/admin/plugin/product_images/${item.image_name}`,
                }}
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                justifyContent: 'space-between',
                alignSelf: 'center',
                alignItems: 'center',
                marginTop: 20
              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {item.pro_name}
              </Text>
              <Text
                style={{
                  color: colors.GREY.TAB,
                  fontSize: 20,
                  fontWeight: '100',
                }}>
                PKR {item.pro_price}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                width: '90%',

                alignSelf: 'center',
                alignItems: 'center',
                height: msg ? 100 : 80,
                borderRadius: 10,
                elevation: 3,
                marginTop: '5%',
                backgroundColor: '#eee',
                justifyContent: 'center'
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  alignItems: 'center',
                  height: 70,
                }}>
                <View
                  style={{
                    width: '50%',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    height: '100%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={() => setQty(qty - 1)}>
                    <Image
                      source={images.minus}
                      style={{ width: 30, height: 30 }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <Text style={{ fontWeight: 'bold' }}>{qty}</Text>
                  <TouchableOpacity onPress={() => setQty(qty + 1)}>
                    <Image
                      source={images.plus}
                      style={{ width: 30, height: 30, alignSelf: 'center' }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
                <Button
                  rounded
                  style={{
                    alignSelf: 'center',
                    width: '35%',
                    marginRight: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.ORANGE.DEFAULT,
                  }}
                  onPress={addItemIntoCart}>
                  <Text style={{ padding: 10 }}>Add to Cart</Text>
                </Button>
              </View>
              {msg && (
                <Text style={{ fontSize: 12, color: 'red' }}>
                  Please click "ADD" button to put this in cart
                </Text>
              )}
            </View>
            <Text
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: '4%',
                fontFamily: 'sans-serif',
                fontSize: 26,
                fontWeight: 'bold',
                // backgroundColor: 'tomato'
              }}>
              Details
            </Text>
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: '4%',
                // backgroundColor: 'tomato',
                marginBottom: 20,
                height: 150
              }}>
              <Text style={{ width: '100%', color: colors.GREY.TAB, textAlign: 'justify', fontWeight: '100' }}>
                {item.pro_des}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProductDetail;
