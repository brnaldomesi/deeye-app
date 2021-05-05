import * as RootNavigation from 'src/navigators/Ref';

import {
  fontWeightBold,
  mtp5,
  mb_message,
  primaryColor,
  secondaryColor,
  textDot7
} from 'src/styles'
import {
  Image,
  Text,
  View
} from 'react-native'

import AddIcon from 'src/components/icons/add'
import Button from 'src/components/Button'
import Footer from 'src/components/icons/footer'
import {COMETCHAT_CONSTANTS, IMAGES_PATH} from 'src/config/constants';
import MyButton from 'src/components/MyButton';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {createStructuredSelector} from "reselect";
import {badgeCountSelector} from "src/redux/modules/alert";
import {connect} from "react-redux";
import {profileSelector} from '../../redux/modules/auth';
import {cometChatLogin, cometchatSelector} from '../../redux/modules/cometchat';
import {CometChat} from "@cometchat-pro/react-native-chat";

const actions = {
  cometChatLogin,
}

const selector = createStructuredSelector({
  badges: badgeCountSelector,
  profile: profileSelector,
  cometChat: cometchatSelector,
});

export default connect(
  selector, actions)(({
  style,
  footerRoute,
  badges,
  cometChat,
  profile
}) => {

  const [msgCount, setMsgCount] = useState(0);
  const {isLoggedIn, user} = cometChat;

  useEffect(() => {
    getCount();
  }, [isLoggedIn]);

  const getCount = () => {
    let UID = profile.email.replace(/[^a-zA-Z0-9]/g, "");

    if ((!isLoggedIn || typeof user.authToken === 'undefined') && profile) {
      cometChatLogin({
        authKey: COMETCHAT_CONSTANTS.AUTH_KEY,
        uid: UID
      });
    } else {
      CometChat.getUnreadMessageCountForUser(UID).then(
        array => {
          console.log("Message count fetched", array);
        },
        error => {
          console.log("Error in getting message count", error);
        }
      );
    }
  };

  const handleAdd = () => {
    // RootNavigation.navigate('PostNew');
    RootNavigation.navigate('PostCreate', { postType: 'Image' });
  };

  const navigateFeeds = () => {
    RootNavigation.navigateAndSimpleReset('Home');
  };

  const navigateMissing = () => {
    RootNavigation.navigateAndSimpleReset('MissingHome');
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
            {msgCount !== 0 && <Text style={{position: 'absolute', color: 'white', fontSize: 9, top: 0, right: -5, minWidth: 10, paddingStart: 5, paddingEnd: 5, paddingTop: 2, paddingBottom: 2, minHeight: 10, backgroundColor: 'red', borderRadius: 8}} >
              {msgCount}
            </Text>}
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
