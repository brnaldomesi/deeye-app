import Home from 'src/navigators/Home';
import MissingHome from 'src/navigators/MissingHome';
import Menu from 'src/navigators/Menu';
import Profile from 'src/navigators/Profile';
import Follow from 'src/navigators/Follow';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const DrawerN = createDrawerNavigator();

const Drawer = () => (
  <DrawerN.Navigator>
    <DrawerN.Screen name="Home" component={Home} />
    <DrawerN.Screen name="MissingHome" component={MissingHome} />
    <DrawerN.Screen name="Profile" component={Profile} />
    <DrawerN.Screen name="Menu" component={Menu} />
    <DrawerN.Screen name="Follow" component={Follow} />
  </DrawerN.Navigator>
)

export default Drawer;
