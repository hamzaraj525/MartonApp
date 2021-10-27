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
  Alert,
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
  Toast,
} from 'native-base';
import { colors } from '../constants/themes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { loginUser, signUpUser } from '../redux/actions/userAction';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images } from '../constants/assets';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import RenderHeader from './Header';
import { cartList } from '../redux/actions/CatAction';

let Login = ({ route }) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  let { total } = route.params;
  let user = useSelector((state) => state.UserReducer.userDetails);
  let guestID = useSelector((state) => state.UserReducer.guest_id);
  let [state, setState] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    country: '',
    address_one: '',
    address_two: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    payment: 'cash',
  });

  let form = [
    {
      label: 'First Name *',
      placeholder: 'First Name',
      name: 'first_name',
    },
    {
      label: 'Last Name *',
      placeholder: 'Last Name',
      name: 'last_name',
    },
    {
      label: 'Company Name (Optional)',
      placeholder: 'Company Name',
      name: 'company_name',
    },
    {
      label: 'Country *',
      placeholder: 'Pakistan',
      name: 'country',
    },
    {
      label: 'Street address *',
      placeholder: 'House number and Street name',
      name: 'address_one',
    },
    {
      label: '',
      placeholder: 'Appartments, suite, unit etc.',
      name: 'address_two',
    },
    {
      label: 'Town / City *',
      placeholder: 'Lahore',
      name: 'city',
    },
    {
      label: 'State / Country *',
      placeholder: 'State / Country',
      name: 'state',
    },
    {
      label: 'Postcode / Zip *',
      placeholder: 'Zip',
      name: 'zip',
    },
    {
      label: 'Phone *',
      placeholder: 'Phone',
      name: 'phone',
    },
    {
      label: 'Email address *',
      placeholder: 'example@gmail.com',
      name: 'email',
    },
  ];

  const checkoutItems = () => {
    Axios.get(
      ` https://thecodeditors.com/test/carobar/api-get-checkout.php?first_name=${state.first_name
      }&last_name=${state.last_name}&company_name=${state.company_name
      }&country=${state.country}&address_one=${state.address_one}&address_two=${state.address_two
      }&city=${state.city}&state=${state.state}&zip=${state.zip}&phone=${state.phone
      }&email=${state.email}&payment=cash&user_id=${user ? user.Data[0].user_id : 0
      }`,
    )
      .then((resp) => {
        Toast.show({
          text: resp.data.result,
          buttonText: 'Okay',
          duration: 3000,
        });
        setTimeout(() => {
          navigation.navigate("PaymentScreen")
        }, 2000);
      })
      .then(() => {
        dispatch(cartList(guestID, user ? user.Data[0].user_id : 0));
      });
  };

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
        <TouchableOpacity style={{ marginRight: '5%' }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              fontFamily: 'sans-serif',
              color: 'black',
            }}>
            Billing Details
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: '98%',
          }}>
          <View style={{ width: '100%', marginTop: '4%' }}>
            {form.map((item, key) => (
              <View style={{ marginBottom: 10 }} key={key}>
                <Label style={{ color: 'black', fontSize: 16, marginBottom: 10 }}>
                  {item.label}
                </Label>
                <Item regular style={{ borderRadius: 5, backgroundColor: colors.GREY.PRIMARY }}>
                  <Input
                    placeholder={item.placeholder}
                    name={item.name}
                    onChangeText={(text) => {
                      let name = item.name;
                      setState({ ...state, [name]: text });
                    }}
                  />
                </Item>
              </View>
            ))}
          </View>
          <View
            style={{
              width: '100%',
              height: 150,
              alignSelf: 'center',
              borderRadius: 1,
              elevation: 1,
              alignItems: 'center',
              marginTop: '2%',
              marginBottom: '10%',
            }}>
            <View style={{ width: '90%', marginTop: '7%' }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                  borderBottomColor: 'lightgray',
                }}>
                Cart Total
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                  borderBottomWidth: 1,
                  paddingBottom: 15,
                  borderBottomColor: 'lightgray',
                }}>
                <Text style={{ color: 'black', fontSize: 18 }}>Subtotal :</Text>
                <Text style={{ color: 'black', fontSize: 18 }}>PKR {total}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ width: '100%', height: '12%', backgroundColor: '#eee', height: 100, borderRadius: 20, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            padding: 10,
            width: "100%",
            alignSelf: 'center',
            backgroundColor: colors.ORANGE.DEFAULT,
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            borderRadius: 50,
            elevation: 1
          }}
          onPress={checkoutItems}>
          <Text
            style={{
              // fontSize: 18,
              color: '#fff',
              textAlign: 'center',
            }}>
            Go to Payment Method
          </Text>
        </TouchableOpacity>
        <View>
          <Text>Total : Rs 400.00</Text>
        </View>
      </View>
    </View >
  );
};

export default Login;
