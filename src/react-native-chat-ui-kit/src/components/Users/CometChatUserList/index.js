/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-did-update-set-state */

import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { CometChatManager } from '../../../utils/controller';
import { CometChatUserListItem } from '../index';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { UserListManager } from './controller';
import { cometchatSelector } from 'src/redux/modules/cometchat';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { pt1 } from 'src/styles';
import style from './styles';
import theme from '../../../resources/theme';

class CometChatUserList extends React.PureComponent {
  timeout;

  friendsOnly = false;

  decoratorMessage = 'Loading...';

  constructor(props) {
    super(props);

    this.state = {
      userlist: [],
      selectedUser: null,
      textInputValue: '',
      textInputFocused: false,
      showSmallHeader: false,
    };
    this.userListRef = React.createRef();
    this.textInputRef = React.createRef(null);
    this.theme = { ...theme, ...this.props.theme };
    this.currentLetter = '';
  }

  componentDidMount() {
    if (Object.prototype.hasOwnProperty.call(this.props, 'friendsOnly')) {
      this.friendsOnly = this.props.friendsOnly;
    }
    
    this.navListener = this.props.navigation.addListener('focus', () => {
      this.decoratorMessage = 'Loading...';
      if (this.UserListManager) {
        this.UserListManager.removeListeners();
      }
      this.setState({ userlist: [] });
      this.UserListManager = new UserListManager(this.friendsOnly);
      if(this.props.cometChat.isLoggedIn) {
        this.getUsers();
      }
      this.UserListManager.attachListeners(this.userUpdated);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.textInputFocused) {
      this.textInputRef.current.focus();
    }
    const previousItem = JSON.stringify(prevProps.item);
    const currentItem = JSON.stringify(this.props.item);

    if (previousItem !== currentItem) {
      if (Object.keys(this.props.item).length === 0) {
        this.userListRef.scrollTop = 0;
        this.setState({ selectedUser: {} });
      } else {
        const userlist = [...this.state.userlist];

        // search for user
        const userKey = userlist.findIndex(
          (u) => u.uid === this.props.item.uid,
        );
        if (userKey > -1) {
          const userObj = { ...userlist[userKey] };
          this.setState({ selectedUser: userObj });
        }
      }
    }

    // if user is blocked/unblocked, update userlist in state
    if (
      prevProps.item &&
      Object.keys(prevProps.item).length &&
      prevProps.item.uid === this.props.item.uid &&
      prevProps.item.blockedByMe !== this.props.item.blockedByMe
    ) {
      const userlist = [...this.state.userlist];
      // search for user
      const userKey = userlist.findIndex((u) => u.uid === this.props.item.uid);
      if (userKey > -1) {
        const userObj = { ...userlist[userKey] };
        const newUserObj = {
          ...userObj,
          blockedByMe: this.props.item.blockedByMe,
        };
        userlist.splice(userKey, 1, newUserObj);

        this.setState({ userlist });
      }
    }
  }

  componentWillUnmount() {
    if(this.UserListManager) {
      this.UserListManager.removeListeners();
    }
    this.UserListManager = null;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.cometChat.isLoggedIn) {
      this.getUsers();
    }
  }

  userUpdated = (user) => {
    const userlist = [...this.state.userlist];

    // search for user
    const userKey = userlist.findIndex((u) => u.uid === user.uid);

    // if found in the list, update user object
    if (userKey > -1) {
      const userObj = { ...userlist[userKey] };
      const newUserObj = { ...userObj, ...user };
      userlist.splice(userKey, 1, newUserObj);

      this.setState({ userlist });
    }
  };

  endReached = () => {
    this.getUsers();
  };

  handleClick = (user) => {
    if (!this.props.onItemClick) return;
    this.props.onItemClick(user, 'user');
  };

  searchUsers = (val) => {
    this.setState(
      { textInputValue: val },

      () => {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
          this.UserListManager = new UserListManager(this.friendsOnly, val);
          this.setState({ userlist: [] }, () => this.getUsers());
        }, 500);
      },
    );
  };

  getUsers = () => {
    new CometChatManager()
      .getLoggedInUser()
      .then(() => {
        this.UserListManager.fetchNextUsers()
          .then((userList) => {
            if (userList.length === 0) {
              this.decoratorMessage = 'No users found';
            }
            this.setState({ userlist: [...this.state.userlist, ...userList] });
          })
          .catch(error => {
            this.decoratorMessage = 'Error';
            console.error('[CometChatUserList] getUsers fetchNext error', error);
          });
      })
      .catch(error => {
        this.decoratorMessage = 'Error';
        console.error('[CometChatUserList] getUsers getLoggedInUser error', error);
      });
  };

  renderUserView = ({ item, index }) => {
    const user = item.value;
    
    return (
      <CometChatUserListItem
        theme={this.theme}
        user={user}
        selectedUser={this.state.selectedUser}
        widgetsettings={this.props.widgetsettings}
        clickeHandler={this.handleClick}
      />
    );
  };

  listEmptyContainer = () => {
    return (
      <View style={style.contactMsgStyle}>
        <Text
          style={[
            style.contactMsgTxtStyle,
            {
              color: `${this.theme.color.secondary}`,
            },
          ]}>
          {this.decoratorMessage}
        </Text>
      </View>
    );
  };

  listHeaderComponent = () => {
    return (
      <View style={[style.contactHeaderStyle]}>
        <Text style={style.contactHeaderTitleStyle}>Users</Text>
        <TouchableWithoutFeedback
          onPress={() => this.textInputRef.current.focus()}>
          <View
            style={[
              style.contactSearchStyle,
              {
                backgroundColor: `${this.theme.backgroundColor.grey}`,
              },
            ]}>
            <Icon
              name="search"
              size={15}
              color={this.theme.color.textInputPlaceholder}
            />
            <TextInput
              ref={this.textInputRef}
              autoCompleteType="off"
              value={this.state.textInputValue}
              placeholder="Search"
              placeholderTextColor={this.theme.color.textInputPlaceholder}
              onChangeText={this.searchUsers}
              onFocus={() => {
                this.setState({ textInputFocused: true });
              }}
              onBlur={() => {
                this.setState({ textInputFocused: false });
              }}
              clearButtonMode="always"
              numberOfLines={1}
              style={[
                style.contactSearchInputStyle,
                {
                  color: `${this.theme.color.primary}`,
                },
              ]}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  handleScroll = ({ nativeEvent }) => {
    if (nativeEvent.contentOffset.y > 35 && !this.state.showSmallHeader) {
      this.setState({
        showSmallHeader: true,
      });
    }
    if (nativeEvent.contentOffset.y <= 35 && this.state.showSmallHeader) {
      this.setState({
        showSmallHeader: false,
      });
    }
  };

  render() {
    const userList = [...this.state.userlist];
    const userListWithHeaders = [];
    let headerIndices = [0];
    if (userList.length) {
      headerIndices = [];
      userList.forEach((user) => {
        userListWithHeaders.push({ value: user, header: false });
      });
    }
    
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={style.contactWrapperStyle}>
            {this.props.cometChat.isLoggedIn ? 
                <FlatList
                  data={userListWithHeaders}
                  renderItem={this.renderUserView}
                  ListEmptyComponent={this.listEmptyContainer}
                  ItemSeparatorComponent={() => <Divider />}
                  stickyHeaderIndices={
                    Platform.OS === 'android' ? null : headerIndices
                  }
                  onScroll={this.handleScroll}
                  onEndReached={this.endReached}
                  onEndReachedThreshold={0.3}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  style={pt1}
                />
              : <ActivityIndicator size="large" color="red" />
            }
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}
const selector = createStructuredSelector({
  cometChat: cometchatSelector
});

export default compose(
  connect(selector, null)
)(CometChatUserList);
