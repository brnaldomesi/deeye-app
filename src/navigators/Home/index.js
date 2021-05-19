/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  flexOne,
} from 'src/styles'
import {Dimensions, Text, View} from 'react-native';

import Feeds from 'src/components/Feeds';
import Footer from 'src/components/Footer';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import { setLocation } from "src/redux/modules/alert";
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
};

import Drawer from 'react-native-drawer';
import MyControlPanel from '../Panel/ControlPanel';

const Home = ({ route, navigation, setLocation }) => {

  const [footerRoute, setFooterRoute] = useState('feeds');
  const [watchID, setWatchID] = useState(null);

  const [open, setOpen] = useState(false);
  const drawer = React.useRef(null);

  useFocusEffect(useCallback(
    () => {
      if(route.params === undefined) {
        setFooterRoute('feeds');
      } else {
        setFooterRoute('feeds');
      }
    }, [route.params])
  );

  useEffect(() => {
    if(watchID === null) {
      const wID = Geolocation.watchPosition( position => {
          setLocation({
            data: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude
            }
          });
        },
        err => {
          console.error(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        },
      );

      setWatchID(wID);
    }

    return () => {
      if(watchID !== null) {
        Geolocation.clearWatch(watchID)
      }
    }
  }, [Geolocation, watchID])

  let controlPanel = <MyControlPanel closeDrawer={() => {
    if (drawer.current !== null) {
      drawer.current.close();
    }
  }} />

  const openDraw = () => {
    if (drawer.current !== null) {
      drawer.current.open();
    }
  }

  return (

    <Drawer
      ref={c => drawer.current = c}
      type={'overlay'}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      openDrawerOffset={0}
      closedDrawerOffset={0}
      panOpenMask={.1}
      panCloseMask={.9}
      relativeDrag={false}
      panThreshold={.25}
      content={controlPanel}
      styles={drawerStyles}
      disabled={open}
      tweenHandler={null}
      tweenDuration={350}
      tweenEasing={'linear'}
      acceptDoubleTap={false}
      acceptTap={false}
      acceptPan={true}
      tapToClose={false}
      negotiatePan={true}

      side={'left'}
    >
      <View style={flexOne}>
        <Feeds footerRoute={footerRoute} open={openDraw} />
        <Footer style={styles.footer} footerRoute={footerRoute} />
      </View>
    </Drawer>
  );
};

const actions = { setLocation };

export default connect(null, actions)(Home);
