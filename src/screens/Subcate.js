import React, { useState, useEffect } from 'react';
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
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Entypo from 'react-native-vector-icons/Entypo';
import { images, slider } from '../constants/assets';
import Axios from 'axios';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import RenderHeader from './Header';
import { addItemInCart } from '../redux/actions/CatAction'
import {
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Toast
} from 'native-base';
const Listing = ({ route }) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  let { item } = route.params;
  let [resultData, setData] = useState(false);
  let [isGrid, setGrid] = useState(true);

  useEffect(() => {
    console.log(item.cat_id);
    Axios.get(
      `http://thecodeditors.com/test/carobar/api-get-subcategories.php?id=${item.cat_id}`,
    ).then((result) => {
      setData(result.data.Data);
    });
  }, [item]);

  const renderSlider = ({ item }) => {
    console.log("item");
    console.log(item);
    return (
      <View
        style={{
          width: resultData && resultData.length > 1 ? '50%' : 250,
          height: 290,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: '80%',
            width: '90%',
            borderRadius: 10,
            elevation: 1,
          }}>
          <TouchableOpacity
            style={{ width: '100%', height: '100%' }}
            onPress={() => navigation.navigate('Products', { item })}>
            <View style={{ width: '100%', height: '72%' }}>
              <Image
                source={{
                  uri: `https://thecodeditors.com/test/marton/admin/sub_category_images/${item.sub_image}`,
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
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                justifyContent: 'space-between',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {item.sub_catname}
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              width: '50%',
              alignItems: 'center',
              marginTop: '5%',
              alignSelf: 'center',
              borderRadius: 10,
              backgroundColor: colors.ORANGE.PRIMARY,
            }}
            onPress={() => navigation.navigate('ProductDetail')}>
            <Text style={{color: 'white', padding: 5}}>ADD</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };



  const _renderHeader = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          elevation: 5,
          borderRadius: 25,
          marginHorizontal: 5,
          backgroundColor: '#fff'
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }} onPress={() => navigation.navigate('Products', { item })}>
          <Thumbnail
            source={{
              uri: `https://thecodeditors.com/test/marton/admin/sub_category_images/${item.sub_image}`,
            }}
            medium
            style={{ margin: 5 }}
          />
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#3d423e' }}>
              {item.sub_catname}
            </Text>

          </View>
        </TouchableOpacity>

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
        <View style={{ width: '100%', height: '83%' }}>
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
                  Sub Category
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    fontFamily: 'sans-serif',
                    color: 'black',
                  }}>
                  {item.cat_name}
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View
              style={{
                width: '20%',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => setGrid(false)}>
                <Image
                  source={images.grid}
                  style={{width: 25, height: 25}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGrid(true)}>
                <Image
                  source={images.grid2}
                  style={{width: 25, height: 25}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View> */}
          </View>
          {isGrid && (
            <View
              style={{
                width: '100%',
                marginTop: '2%',

                height: '200%'
              }}>
              {resultData ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={resultData}
                  keyExtractor={({ _, i }) => String(i)}
                  renderItem={_renderHeader}

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
                          <Thumbnail
                            square
                            source={{
                              uri: `https://thecodeditors.com/test/marton/admin/plugin/product_images/${item.image_name}`,
                            }}
                          />
                        </Left>
                        <Body>
                          <Text>{item.pro_name}</Text>
                          <Text note numberOfLines={1}>
                            {item.pro_des}
                          </Text>
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
                                text: 'Item added into cart',
                                buttonText: 'Okay',
                                duration: 3000,
                              });
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
