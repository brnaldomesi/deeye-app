/* eslint-disable radix */
import React from 'react';
import { MessageHeaderManager } from './controller';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CometChatUserPresence, CometChatAvatar } from '../../Shared';
import * as enums from '../../../utils/enums';
import * as actions from '../../../utils/actions';
import { Button } from 'react-native-elements';
import { IMAGES_PATH } from 'src/config/constants';
import { getDiffFromToday } from 'src/utils/helpers';
import { bgTransparent, p0, resizeContain } from 'src/styles';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { logger } from '../../../utils/common';
import { CometChat } from '@cometchat-pro/react-native-chat';
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

    if (this.props.type === CometChat.RECEIVER_TYPE.USER) {
      this.setStatusForUser();
    } else {
      this.setStatusForGroup();
    }
  }

  componentDidUpdate(prevProps) {
    try {
      this.MessageHeaderManager.removeListeners();
      this.MessageHeaderManager = new MessageHeaderManager();
      this.MessageHeaderManager.attachListeners(this.updateHeader);

      if (
        this.props.type === CometChat.RECEIVER_TYPE.USER &&
        prevProps.item.uid !== this.props.item.uid
      ) {
        this.setStatusForUser();
      } else if (
        this.props.type === CometChat.RECEIVER_TYPE.GROUP &&
        (prevProps.item.guid !== this.props.item.guid ||
          (prevProps.item.guid === this.props.item.guid &&
            prevProps.item.membersCount !== this.props.item.membersCount))
      ) {
        this.setStatusForGroup();
      }
    } catch (error) {
      logger(error);
    }
  }

  componentWillUnmount() {
    this.MessageHeaderManager.removeListeners();
    this.MessageHeaderManager = null;
  }

  /**
   * handler for set status for user i.e online/offline
   * @param
   */

  setStatusForUser = () => {
    try {
      let { status } = this.props.item;
      const presence =
        this.props.item.status === CometChat.USER_STATUS.ONLINE
          ? CometChat.USER_STATUS.ONLINE
          : CometChat.USER_STATUS.OFFLINE;

      if (
        this.props.item.status === CometChat.USER_STATUS.OFFLINE &&
        this.props.item.lastActiveAt
      ) {
        status = `Last active at: ${new Date(
          this.props.item.lastActiveAt * 1000,
        ).toLocaleTimeString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}`;
      } else if (this.props.item.status === CometChat.USER_STATUS.OFFLINE) {
        status = 'offline';
      }

      this.setState({ status, presence });
    } catch (error) {
      logger(error);
    }
  };

  /**
   * handler for set status for group i.e memberCount
   * @param
   */
  setStatusForGroup = () => {
    try {
      const status = `${this.props.item.membersCount} Members`;
      this.setState({ status });
    } catch (error) {
      logger(error);
    }
  };

  /**
   * handler for updation of header based on key.
   * @param key: action name
   * @param item: item object
   * @param groupUser: groupUser object
   */
  updateHeader = (key, item, groupUser) => {
    try {
      switch (key) {
        case enums.USER_ONLINE:
        case enums.USER_OFFLINE: {
          if (
            this.props.type === CometChat.RECEIVER_TYPE.USER &&
            this.props.item.uid === item.uid
          ) {
            this.setState({ status: item.status, presence: item.status });
          }
          break;
        }
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_LEFT:
          if (
            this.props.type === CometChat.RECEIVER_TYPE.GROUP &&
            this.props.item.guid === item.guid &&
            this.props.loggedInUser.uid !== groupUser.uid
          ) {
            const membersCount = parseInt(item.membersCount);
            const status = `${membersCount} Members`;
            this.setState({ status });
          }
          break;
        case enums.GROUP_MEMBER_JOINED:
          if (
            this.props.type === CometChat.RECEIVER_TYPE.GROUP &&
            this.props.item.guid === item.guid
          ) {
            const membersCount = parseInt(item.membersCount);
            const status = `${membersCount} Members`;
            this.setState({ status });
          }
          break;
        case enums.GROUP_MEMBER_ADDED:
          if (
            this.props.type === CometChat.RECEIVER_TYPE.GROUP &&
            this.props.item.guid === item.guid
          ) {
            const membersCount = parseInt(item.membersCount);
            const status = `${membersCount} Members`;
            this.setState({ status });
          }
          break;
        case enums.TYPING_STARTED: {
          if (
            this.props.type === CometChat.RECEIVER_TYPE.GROUP &&
            this.props.type === item.receiverType &&
            this.props.item.guid === item.receiverId
          ) {
            this.setState({ status: `${item.sender.name} is typing...` });
            this.props.actionGenerated(actions.SHOW_REACTION, item);
          } else if (
            this.props.type === CometChat.RECEIVER_TYPE.USER &&
            this.props.type === item.receiverType &&
            this.props.item.uid === item.sender.uid
          ) {
            this.setState({ status: 'typing...' });
            this.props.actionGenerated(actions.SHOW_REACTION, item);
          }
          break;
        }
        case enums.TYPING_ENDED: {
          if (
            this.props.type === CometChat.RECEIVER_TYPE.GROUP &&
            this.props.type === item.receiverType &&
            this.props.item.guid === item.receiverId
          ) {
            this.setStatusForGroup();
            this.props.actionGenerated(actions.STOP_REACTION, item);
          } else if (
            this.props.type === CometChat.RECEIVER_TYPE.USER &&
            this.props.type === item.receiverType &&
            this.props.item.uid === item.sender.uid
          ) {
            this.props.actionGenerated(actions.STOP_REACTION, item);

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
    } catch (error) {
      logger(error);
    }
  };

  render() {
    let image;
    let userName;
    let presence;
    if (this.props.type === CometChat.RECEIVER_TYPE.USER) {
      image = this.props.item.avatar;
      userName = this.props.item.name;
      presence = (
        <CometChatUserPresence
          status={this.state.presence}
          style={{ top: 25 }}
          cornerRadius={9}
          borderColor={this.props.theme.borderColor.white}
          borderWidth={2}
        />
      );
    } else {
      if (this.props.item.icon) {
        image = this.props.item.icon;
      }
      userName = this.props.item.name;
    }

    let audioCallBtn = (
      <Button
        onPress={() => this.props.actionGenerated(actions.AUDIO_CALL)}
        buttonStyle={[bgTransparent, p0]}
        icon={
          <Image source={IMAGES_PATH.audio} style={[resizeContain, styles.callIcon]} />
        } 
      />
    );
    let videoCallBtn = (
      <Button
        onPress={() => this.props.actionGenerated(actions.VIDEO_CALL)}
        buttonStyle={bgTransparent}
        icon={
          <Image source={IMAGES_PATH.video} style={[resizeContain, styles.callIcon]} />
        } 
      />
    );

    if (
      this.props.item.blockedByMe === true ||
      this.props.audioCall === false ||
      this.props.type === CometChat.ACTION_TYPE.TYPE_GROUP
    ) {
      audioCallBtn = null;
    }

    if (
      this.props.item.blockedByMe === true ||
      this.props.videoCall === false
    ) {
      videoCallBtn = null;
    }
    if (this.props.item.blockedByMe) {
      status = null;
      presence = null;
    }

    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => this.props.actionGenerated(actions.GO_BACK)}>
          <Icon
            name="chevron-back-sharp"
            size={32}
            color={this.props.theme.color.blue}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.actionGenerated(actions.VIEW_DETAIL)}
          style={styles.headerDetailContainer}>
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
          <View style={styles.itemDetailContainer}>
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
