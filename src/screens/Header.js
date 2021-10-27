import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import { colors } from '../constants/themes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { images, slider } from '../constants/assets';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { cartList } from '../redux/actions/CatAction';
const RenderHeader = () => {
  let navigation = useNavigation();
  let guestID = useSelector((state) => state.UserReducer.guest_id);
  let user = useSelector((state) => state.UserReducer.userDetails);
  let dispatch = useDispatch();
  let cartReducer = useSelector((state) => state.CatReducer.cartItems);
  let [cartItems, setCartItems] = useState([]);
  let [query, setQuery] = useState("");
  useEffect(() => {
    dispatch(cartList(guestID, user ? user.Data[0].user_id : 0));
  }, []);
  useEffect(() => {
    setCartItems(cartReducer);
  }, [cartReducer]);
  return (
    <View
      style={{
        width: '100%',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        elevation: 4,
        marginBottom: 20
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
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 40
        }}>
        <TextInput
          style={{ width: '80%', paddingLeft: 10 }}
          placeholder="Search Groceries Or Product"
          onChangeText={(text) => setQuery(text)}
        />
        <TouchableOpacity onPress={() => navigation.navigate("SearchResult", { query: query.toLowerCase() })}>
          <AntDesign name="search1" size={25} />
        </TouchableOpacity>
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
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {cartItems.length}
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Cart', { cartItemChanged: cartReducer })
        }>
        <Image
          source={images.cart}
          style={{ width: 30, height: 30 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default RenderHeader;
