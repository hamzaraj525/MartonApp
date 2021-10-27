import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import HomeScreen from '../screens/HomeScreen';
import Products from '../screens/Products';
import ProductDetails from '../screens/ProductDetails';
import SubCate from '../screens/Subcate';
import Recommended from '../screens/Recommended';
import Featured from '../screens/Featured';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import Orders from '../screens/Orders';
import OrderDetails from '../screens/OrderDetails';
import AllProducts from '../screens/AllProducts';
import Recents from '../screens/Recents';
import Categories from '../screens/Categories';
import SearchResult from '../screens/SearchResult';
import ChangePassword from '../screens/ChangePassword';
import ForgotPassword from '../screens/ForgotPassword';
import PaymentScreen from '../screens/PaymentScreen';
import AddPaymentMethod from '../screens/AddPaymentMethod';




import { navOptionHandler } from '../constants/functions';
import DrawerContent from '../drawer/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackRoute() {
  let user = useSelector((state) => state.UserReducer.userDetails);
  // console.log("user in stack path");
  // console.log(user);
  return (
    <NavigationContainer>
      {/* {user ?  */}
      <Drawer.Navigator initialRouteName="Splash" drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Splash" component={Splash} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="Products" component={Products} />
        <Drawer.Screen name="ProductDetails" component={ProductDetails} />
        <Drawer.Screen name="SubCategory" component={SubCate} />
        <Drawer.Screen name="Recommended" component={Recommended} />
        <Drawer.Screen name="Featured" component={Featured} />
        <Drawer.Screen name="Cart" component={Cart} />
        <Drawer.Screen name="Checkout" component={Checkout} />
        <Drawer.Screen name="Orders" component={Orders} />
        <Drawer.Screen name="OrderDetails" component={OrderDetails} />
        <Drawer.Screen name="AllProducts" component={AllProducts} />
        <Drawer.Screen name="Recents" component={Recents} />
        <Drawer.Screen name="Categories" component={Categories} />
        <Drawer.Screen name="SearchResult" component={SearchResult} />
        <Drawer.Screen name="ChangePassword" component={ChangePassword} />
        <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
        <Drawer.Screen name="PaymentScreen" component={PaymentScreen} />
        <Drawer.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
      </Drawer.Navigator>
      {/* :
   <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={navOptionHandler}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={navOptionHandler}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={navOptionHandler}
        />
        <Stack.Screen
          name="Products"
          component={Products}
          options={navOptionHandler}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={navOptionHandler}
        />
       <Stack.Screen
          name="Nav"
          component={Nav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubCategory"
          component={SubCate}
          options={navOptionHandler}
        />
        <Stack.Screen
          name="Recommended"
          component={Recommended}
          options={navOptionHandler}
        />
        <Stack.Screen
          name="FeaturedDetails"
          component={FeaturedDetails}
          options={navOptionHandler}
        />
        <Stack.Screen name="Cart" component={Cart} options={navOptionHandler} />
      </Stack.Navigator>
  } */}

    </NavigationContainer>
  );
}

export default StackRoute;
