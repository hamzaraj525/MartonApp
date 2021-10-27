import * as React from 'react';
import {Button, View, Text, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialIcons';
// import HomeScreen from '../screens/HomeScreen';
// import Recomended from '../screens/Recomended';
import DrawerContent from './DrawerContent';
const Drawer = createDrawerNavigator();

export default function RouteNav() {
    console.log("loads drawer");
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props}  />} >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: 'black'}}>Dashboard</Text>
          ),
          unmountOnBlur: () => true,
        }}
      />
      <Drawer.Screen
        name="Recomended"
        component={Recomended}
        options={{
          drawerLabel: ({focused, color}) => (
            <Text style={{color: 'black'}}>Dashboard</Text>
          ),
          unmountOnBlur: () => true,
        }}
      />
    </Drawer.Navigator>
  );
}
