import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, Alert } from 'react-native';
import { colors } from '../constants/themes';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addItemInCart } from '../redux/actions/CatAction';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import RenderHeader from './Header';
import { cartList } from '../redux/actions/CatAction';
import { images } from '../constants/assets';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  Toast
} from 'native-base';

const Listing = ({ route }) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();

  let [resultData, setData] = useState(false);
  let [isGrid, setGrid] = useState(true);
  let guestID = useSelector((state) => state.UserReducer.guest_id);
  let user = useSelector((state) => state.UserReducer.userDetails);

  useEffect(() => {
    Axios.get(`https://thecodeditors.com/test/carobar/api-get-allproduct.php`)
      .then((result) => {
        console.log('result.Data');
        console.log(result.data.Data);
        setData(result.data.Data);
      })
      .then(() => {
        dispatch(cartList(guestID, user ? user.Data[0].user_id : 0));
      });
  }, []);

  const renderSlider = ({ item }) => {
    return (
      <View
        style={{
          width: resultData && resultData.length > 1 ? '50%' : 250,
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5
        }}>
        <View
          style={{
            height: '80%',
            width: '90%',
            borderRadius: 10,
            elevation: 5,
            backgroundColor: '#fff'
          }}>
          <View style={{ width: '100%', height: '72%' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductDetails', { item })}>
              <Image
                source={{
                  uri: `https://thecodeditors.com/test/marton/admin/plugin/product_images/${item.image_name}`,
                }}
                resizeMode="stretch"
                style={{
                  width: '90%',
                  height: '90%',
                  marginLeft: '4%',
                  marginTop: 10,
                  borderRadius: 15,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#3d423e' }}>
              {item.pro_name}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'darkgray' }}>
              PKR {item.pro_price}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: '60%',
              alignItems: 'center',
              marginTop: '5%',
              alignSelf: 'center',
              borderRadius: 30,
              backgroundColor: colors.ORANGE.PRIMARY,
            }}
            onPress={() => {
              dispatch(
                addItemInCart(item, guestID, user ? user.Data[0].user_id : 0),
              );
              Toast.show({
                text: "Item added into cart",
                buttonText: "Okay",
                duration: 3000
              })

            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <Ionicons name={'cart-outline'} color={'#fff'} />
              <Text style={{ color: 'white', padding: 5 }}>Add to cart</Text>
            </View>
          </TouchableOpacity>
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
      <SafeAreaView />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%', height: '100%' }}>
          <RenderHeader />
          <View
            style={{
              flexDirection: 'row',
              width: '92%',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ width: '60%' }}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    fontFamily: 'sans-serif',
                    color: 'black',
                  }}>
                  All Products
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '20%',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => setGrid(false)}>
                <Image
                  source={images.grid}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGrid(true)}>
                <Image
                  source={images.grid2}
                  style={{ width: 25, height: 25 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          {isGrid && (
            <View
              style={{
                width: '100%',
                marginTop: '2%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              {resultData ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={resultData}
                  keyExtractor={({ _, i }) => String(i)}
                  renderItem={renderSlider}
                  numColumns={2}
                />
              ) : (
                <View>
                  <Text>No Product Available</Text>
                </View>
              )}
            </View>
          )}

          {!isGrid && (
            <Content>
              <List>
                {resultData ? (
                  resultData.map((item, key) => {
                    return (
                      <ListItem thumbnail>
                        <Left>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('ProductDetails', { item })
                            }>
                            <Thumbnail
                              square
                              source={{
                                uri: `https://thecodeditors.com/test/marton/admin/plugin/product_images/${item.image_name}`,
                              }}
                            />
                          </TouchableOpacity>
                        </Left>
                        <Body>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('ProductDetails', { item })
                            }>
                            <Text style={{ color: '#3d423e' }}>
                              {item.pro_name}
                            </Text>
                            <Text
                              note
                              numberOfLines={1}
                              style={{ color: 'darkgray' }}>
                              PKR {item.pro_price}
                            </Text>
                          </TouchableOpacity>
                        </Body>
                        <Right>
                          <TouchableOpacity
                            style={{
                              alignItems: 'center',
                              marginTop: '5%',
                              alignSelf: 'center',
                              borderRadius: 10,
                              backgroundColor: colors.ORANGE.PRIMARY,
                            }}
                            onPress={() => {
                              dispatch(
                                addItemInCart(
                                  item,
                                  guestID,
                                  user ? user.Data[0].user_id : 0,
                                ),
                              );
                              Toast.show({
                                text: "Item added into cart",
                                buttonText: "Okay",
                                duration: 3000
                              })
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                padding: 5,
                                fontSize: 12,
                              }}>
                              ADD
                            </Text>
                          </TouchableOpacity>
                        </Right>
                      </ListItem>
                    );
                  })
                ) : (
                  <View>
                    <Text>No Product Available</Text>
                  </View>
                )}
              </List>
            </Content>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Listing;
