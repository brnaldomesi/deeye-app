/* eslint-disable radix */

import * as enums from '../../../utils/enums';

import { CometChatAvatar, CometChatUserPresence } from '../../Shared';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { bgTransparent, p0, resizeContain } from 'src/styles';

import { Button } from 'react-native-elements';
import { IMAGES_PATH } from 'src/config/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { MessageHeaderManager } from './controller';
import React from 'react';
import { getDiffFromToday } from 'src/utils/helpers';
import styles from './styles';

// import theme from '../../resources/theme';

class CometChatMessageHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      presence: 'offline',
    };
  }

  componentDidMount() {
    this.MessageHeaderManager = new MessageHeaderManager();
    this.MessageHeaderManager.attachListeners(this.updateHeader);

    if (this.props.type === 'user') {
      this.setStatusForUser();
    } else {
      this.setStatusForGroup();
    }
  }

  componentDidUpdate(prevProps) {
    this.MessageHeaderManager.removeListeners();
    this.MessageHeaderManager = new MessageHeaderManager();
    this.MessageHeaderManager.attachListeners(this.updateHeader);

    if (this.props.type === 'user' && prevProps.item.uid !== this.props.item.uid) {
      this.setStatusForUser();
    } else if (
      this.props.type === 'group' &&
      (prevProps.item.guid !== this.props.item.guid ||
        (prevProps.item.guid === this.props.item.guid &&
          prevProps.item.membersCount !== this.props.item.membersCount))
    ) {
      this.setStatusForGroup();
    }
  }

  componentWillUnmount() {
    this.MessageHeaderManager.removeListeners();
    this.MessageHeaderManager = null;
  }

  setStatusForUser = () => {
    let { status } = this.props.item;
    const presence = this.props.item.status === 'online' ? 'online' : 'offline';

    if (this.props.item.status === 'offline' && this.props.item.lastActiveAt) {
      status = `Last active at: ${new Date(this.props.item.lastActiveAt * 1000).toLocaleTimeString(
        'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }
      )}`;
    } else if (this.props.item.status === 'offline') {
      status = 'offline';
    }

    this.setState({ status, presence });
  };

  setStatusForGroup = () => {
    const status = `${this.props.item.membersCount} Members`;
    this.setState({ status });
  };

  updateHeader = (key, item, groupUser) => {
    switch (key) {
      case enums.USER_ONLINE:
      case enums.USER_OFFLINE: {
        if (this.props.type === 'user' && this.props.item.uid === item.uid) {
          if (
            this.props.widgetsettings &&
            Object.prototype.hasOwnProperty.call(this.props.widgetsettings, 'main') &&
            Object.prototype.hasOwnProperty.call(
              this.props.widgetsettings.main,
              'show_user_presence'
            ) &&
            this.props.widgetsettings.main.show_user_presence === false
          ) {
            return false;
          }
          this.setState({ status: item.status, presence: item.status });
        }
        break;
      }
      case enums.GROUP_MEMBER_KICKED:
      case enums.GROUP_MEMBER_BANNED:
      case enums.GROUP_MEMBER_LEFT:
        if (
          this.props.type === 'group' &&
          this.props.item.guid === item.guid &&
          this.props.loggedInUser.uid !== groupUser.uid
        ) {
          const membersCount = parseInt(item.membersCount);
          const status = `${membersCount} Members`;
          this.setState({ status });
        }
        break;
      case enums.GROUP_MEMBER_JOINED:
        if (this.props.type === 'group' && this.props.item.guid === item.guid) {
          const membersCount = parseInt(item.membersCount);
          const status = `${membersCount} Members`;
          this.setState({ status });
        }
        break;
      case enums.GROUP_MEMBER_ADDED:
        if (this.props.type === 'group' && this.props.item.guid === item.guid) {
          const membersCount = parseInt(item.membersCount);
          const status = `${membersCount} Members`;
          this.setState({ status });
        }
        break;
      case enums.TYPING_STARTED: {
        if (
          this.props.type === 'group' &&
          this.props.type === item.receiverType &&
          this.props.item.guid === item.receiverId
        ) {
          this.setState({ status: `${item.sender.name} is typing...` });
          this.props.actionGenerated('showReaction', item);
        } else if (
          this.props.type === 'user' &&
          this.props.type === item.receiverType &&
          this.props.item.uid === item.sender.uid
        ) {
          this.setState({ status: 'typing...' });
          this.props.actionGenerated('showReaction', item);
        }
        break;
      }
      case enums.TYPING_ENDED: {
        if (
          this.props.type === 'group' &&
          this.props.type === item.receiverType &&
          this.props.item.guid === item.receiverId
        ) {
          this.setStatusForGroup();
          this.props.actionGenerated('stopReaction', item);
        } else if (
          this.props.type === 'user' &&
          this.props.type === item.receiverType &&
          this.props.item.uid === item.sender.uid
        ) {
          this.props.actionGenerated('stopReaction', item);

          if (this.state.presence === 'online') {
            this.setState({ status: 'online', presence: 'online' });
          } else {
            this.setStatusForUser();
          }
        }
        break;
      }
      default:
        break;
    }
  };

  // toggleTooltip = (event, flag) => {
  //   const elem = event.target;
  //   const { scrollWidth } = elem;
  //   const { clientWidth } = elem;

  //   if (scrollWidth <= clientWidth) {
  //     return false;
  //   }

  //   if (flag) {
  //     elem.setAttribute('title', elem.textContent);
  //   } else {
  //     elem.removeAttribute('title');
  //   }
  // };


  render() {
    let image;
    let userName;
    let presence;
    if (this.props.type === 'user') {
      image = this.props.item.avatar;
      userName = this.props.item.name;
      presence = (
        <CometChatUserPresence
          status={this.state.presence}
          cornerRadius={9}
          borderColor={this.props.theme.borderColor.primary}
          borderWidth={1}
        />
      );
    } else {
      if (this.props.item.icon) {
        image = this.props.item.icon;
      }
      userName = this.props.item.name;
    }

    let status = (
      <Text style={styles.statusText} numberOfLines={1}>
        {this.state.status}
      </Text>
    );

    let audioCallBtn = (
      // <TouchableOpacity
      //   onPress={() => this.props.actionGenerated('audioCall')}
      //   style={styles.audioCallContainer}>
      //   <Image source={audioCallIcon} style={styles.callIcon} />
      // </TouchableOpacity>
      <Button
        onPress={() => this.props.actionGenerated('videoCall')}
        buttonStyle={[bgTransparent, p0]}
        icon={
          <Image source={IMAGES_PATH.video} style={[resizeContain, styles.callIcon]} />
        } 
      />
    );
    let videoCallBtn = (
      <Button
        onPress={() => this.props.actionGenerated('audioCall')}
        buttonStyle={bgTransparent}
        icon={
          <Image source={IMAGES_PATH.audio} style={[resizeContain, styles.callIcon]} />
        } 
      />
    );

    // Remove comments for widget checks

    // if (this.props.viewdetail === false) {
    //   viewDetailBtn = null;
    // }

    if (this.props.item.blockedByMe === true || this.props.audiocall === false) {
      audioCallBtn = null;
    }

    if (this.props.item.blockedByMe === true || this.props.videocall === false) {
      videoCallBtn = null;
    }

    if (
      this.props.widgetsettings &&
      Object.prototype.hasOwnProperty.call(this.props.widgetsettings, 'main')
    ) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.props.widgetsettings.main,
          'enable_voice_calling'
        ) &&
        this.props.widgetsettings.main.enable_voice_calling === false
      ) {
        audioCallBtn = null;
      }

      if (
        Object.prototype.hasOwnProperty.call(
          this.props.widgetsettings.main,
          'enable_video_calling'
        ) &&
        this.props.widgetsettings.main.enable_video_calling === false
      ) {
        videoCallBtn = null;
      }

      if (
        Object.prototype.hasOwnProperty.call(
          this.props.widgetsettings.main,
          'show_user_presence'
        ) &&
        this.props.widgetsettings.main.show_user_presence === false &&
        this.props.type === 'user'
      ) {
        status = null;
      }
    }
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => this.props.actionGenerated('goBack')}>
          <Icon name="arrow-back-outline" size={34} color={this.props.theme.color.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.actionGenerated('viewDetail')}
          style={styles.headerDetailContainer}>
          <View style={styles.itemDetailContainer}>
            <View
              style={[
                styles.avatarContainer,
                {
                  backgroundColor: 'rgba(51,153,255,0.25)',
                },
              ]}>
              <CometChatAvatar
                image={{ uri: image }}
                cornerRadius={25}
                borderColor={this.props.theme.borderColor.primary}
                borderWidth={0}
                name={userName}
              />
              {presence}
            </View>
            <Text style={styles.itemNameText} numberOfLines={1}>
              {this.props.item.name}
            </Text>
            <Text>{getDiffFromToday(this.props.item.lastActiveAt, true) + ' ago'}</Text>
          </View>
          {audioCallBtn}
          {videoCallBtn}
        </TouchableOpacity>
      </View>
    );
  }
}

export default CometChatMessageHeader;
