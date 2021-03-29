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
  Size,
  flexOne,
  gradientColors,
  itemsCenter,
  roundMediumSizeButtonStyle
} from 'src/styles'
import { Text, View } from 'react-native';

import Feeds from 'src/components/Feeds';
import Footer from 'src/components/Footer';
import Geolocation from '@react-native-community/geolocation';
import GradientButton from 'src/components/GradientButton';
import { connect } from 'react-redux';
import { setLocation } from "src/redux/modules/alert";
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ route, navigation, setLocation }) => {
   
  const [footerRoute, setFooterRoute] = useState('feeds');
  const [watchID, setWatchID] = useState(null);

  useFocusEffect(useCallback(
    () => {
      if(route.params === undefined) {
        setFooterRoute('feeds');
      } else {
        setFooterRoute(route.params.query);
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

  const handleViewMore = () => {
    
  };

  return (
    <View style={flexOne}>
      <Feeds footerRoute={footerRoute} />
      {/* <GradientButton 
        onPress={handleViewMore}
        gradientColors={gradientColors}
        buttonStyle={roundMediumSizeButtonStyle}
        text="View More Post"
        textColor="white"
        fontSize={Size()}
        style={styles.gradientButton}
      /> */}
      <Footer style={styles.footer} footerRoute={footerRoute} />
    </View>
  );
};

const actions = { setLocation };

export default connect(null, actions)(Home);
