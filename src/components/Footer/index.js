import * as RootNavigation from 'src/navigators/Ref';

import {
  Colors,
  Size,
  fontWeightBold,
  itemsCenter,
  mtp5,
  mb_message,
  primaryColor,
  secondaryColor,
  textDot7
} from 'src/styles'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

import AddIcon from 'src/components/icons/add'
import Button from 'src/components/Button'
import Footer from 'src/components/icons/footer'
import { IMAGES_PATH } from 'src/config/constants';
import MyButton from 'src/components/MyButton';
import React from 'react';
import styles from './styles';
import {createStructuredSelector} from "reselect";
import {badgeCountSelector} from "src/redux/modules/alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const selector = createStructuredSelector({
  badges: badgeCountSelector,
});

export default connect(
  selector, null)(({
  style,
  footerRoute,
  badges
}) => {

  const handleAdd = () => {
    RootNavigation.navigate('PostNew');
  };

  const navigateFeeds = () => {
    RootNavigation.navigate('Home', { query: 'feeds' });
  };

  const navigateMissing = () => {
    RootNavigation.navigate('Home', { query: 'missing' });
  };

  const navigateAlert = () => {
    RootNavigation.navigate('Alert');
  };

  const navigateMessage = () => {
    RootNavigation.navigate('Message');
  };

  return (
    <View style={style}>
      <View style={styles.outline}>
        <View style={styles.wing} />
        <Footer />
        <View style={styles.wing} />
      </View>
      <View style={styles.height} />
      <View style={styles.content}>
        <MyButton onPress={navigateFeeds}>
          <Image style={[styles.feeds, styles.icons]} source={footerRoute === 'feeds' ? IMAGES_PATH.feedsActive : IMAGES_PATH.feeds} />
          <Text style={[mtp5, textDot7, footerRoute === 'feeds' ? [primaryColor, fontWeightBold] : secondaryColor ]}>FEEDS</Text>
        </MyButton>
        <MyButton onPress={navigateMissing}>
          <Image style={[styles.missing, styles.icons]} source={footerRoute === 'missing' ? IMAGES_PATH.missingActive : IMAGES_PATH.missing} />
          <Text style={[mtp5, textDot7, footerRoute === 'missing' ? [primaryColor, fontWeightBold] : secondaryColor ]}>MISSING</Text>
        </MyButton>
        <View></View>
        <MyButton onPress={navigateAlert}>
          <View>
            <Image style={[styles.alert, styles.icons]} source={footerRoute === 'alert' ? IMAGES_PATH.alertActive : IMAGES_PATH.alert} />
            {badges !== 0 && <Text style={{position: 'absolute', color: 'white', fontSize: 9, top: 0, right: 0, minWidth: 10, paddingStart: 5, paddingEnd: 5, paddingTop: 2, paddingBottom: 2, minHeight: 10, backgroundColor: 'red', borderRadius: 8}} >
              {badges}
            </Text>}
          </View>
          <Text style={[mtp5, textDot7, footerRoute === 'alert' ? [primaryColor, fontWeightBold] : secondaryColor ]}>ALERT</Text>
        </MyButton>
        <MyButton onPress={navigateMessage}>
          <View>
            <Image style={[styles.message]} source={footerRoute === 'message' ? IMAGES_PATH.messageActive : IMAGES_PATH.message} />
          </View>
          <Text style={[mtp5, textDot7, mb_message, footerRoute === 'message' ? [primaryColor, fontWeightBold] : secondaryColor ]}>MESSAGES</Text>
        </MyButton>
      </View>
      <View style={styles.addButtonView}>
        <Button style={styles.addButton} onPress={handleAdd}>
          <AddIcon />
        </Button>
      </View>
    </View>
  );
});
