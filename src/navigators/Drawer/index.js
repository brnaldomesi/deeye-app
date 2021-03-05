import Home from 'src/navigators/Home';
import Menu from 'src/navigators/Menu';
import Profile from 'src/navigators/Profile';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const DrawerN = createDrawerNavigator();

const Drawer = () => (
  <DrawerN.Navigator>
    <DrawerN.Screen name="Home" component={Home} />
    <DrawerN.Screen name="Profile" component={Profile} />
    <DrawerN.Screen name="Menu" component={Menu} />
  </DrawerN.Navigator>
)

export default Drawer;
