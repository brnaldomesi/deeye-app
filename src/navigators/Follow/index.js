import {
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  View,
  TextInput
} from 'react-native';
import React, {useEffect, useState, useMemo, useRef} from 'react';
import styles from './styles';
import * as gStyle from 'src/styles'
import {IMAGES_PATH} from "../../config/constants";
import {ListItem, Avatar, BottomSheet} from 'react-native-elements'
import {Size, absolute} from "src/styles";
import {
  getFollowList,
  setFollow,
  followListSelector,
} from 'src/redux/modules/follow';
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import {connect} from "react-redux";
import { ASSET_BASE_URL } from 'src/config/apipath';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RBSheet from 'react-native-raw-bottom-sheet';

const Follow = ({navigation, getFollowList, setFollow, follows}) => {

  const [tap, setTap] = useState('left');
  const [isEdit, setIsEdit] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [avatarPath, setAvatarPath] = useState(null);
  const [avatarName, setAvatarName] = useState('');
  const [profile, setProfile] = useState({});

  const refRBSheet = useRef();

  AsyncStorage.getItem('profile').then(profile => {
    setAvatarPath(ASSET_BASE_URL + JSON.parse(profile).avatar_path);
    setAvatarName(JSON.parse(profile).first_name)
  });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTap('left')
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    getFollowList({params: {type: tap === 'left' ? 0 : 1, search: searchText}});
  }, [tap, isEdit]);

  const handleChange = (object) => {
    setSearchText(object);
    setIsEdit(object !== '')
  };

  const handleCancel = () => {
    setSearchText('');

    setIsEdit(false);
  };

  const onTap = type => () => {
    setTap(type);
  };

  const handleOpen = (item) => () => {
    setProfile(item);
    refRBSheet.current.open();
  };

  const handleDetail = (id, type) => () => {
    setFollow({
      isPin: type === 'follow',
      isFollow: true,
      follower_id: id,
      data: {user_id: id, type: type}});
  }

  const tapStyle = function (type, tap) {
    return {
      textAlign: 'center',
      height: '100%',
      lineHeight: Size(3),
      color: type === tap ? '#05174f' : 'gray',
    }
  };

  const tapBottomStyle = function (type, tap) {
    return {
      position: 'absolute',
      width: '100%',
      height: 6,
      backgroundColor: type === tap ? '#05174f' : '#f1f6fb',
      bottom: 0,
    }
  };

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={[styles.navbar, styles.d_flex]}>
        <View style={[styles.m_auto, styles.d_flex]}>
          <View style={[styles.centerImg]}>
            <Image style={styles.avatarImg} source={{uri: avatarPath}}/>
          </View>
          <Text style={styles.avatarText}>{avatarName}</Text>
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={() => {
          navigation.goBack()
        }}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.tapBar]}>
        <TouchableOpacity onPress={onTap('left')} style={styles.tapBarBtn}>
          <Text style={tapStyle(tap, 'left')}>Followers</Text>
          <View style={tapBottomStyle(tap, 'left')}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onTap('right')} style={styles.tapBarBtn}>
          <Text style={tapStyle(tap, 'right')}>Following</Text>
          <View style={tapBottomStyle(tap, 'right')}></View>
        </TouchableOpacity>
      </View>
      <View style={[styles.d_flex, gStyle.bgWhite]}>
        <View style={[styles.m_auto, styles.searchBarParent]}>
          <Image style={styles.searchBtn} source={IMAGES_PATH.search}/>
          <TextInput
            placeholder={'Search'}
            style={styles.searchBarInput}
            onChangeText={handleChange}
            multiline={false}
            value={searchText}
            onSubmitEditing={() => {
              getFollowList({params: {type: tap === 'left' ? 0 : 1, search: searchText}});
            }}
          />
          {isEdit && <TouchableOpacity onPress={handleCancel} style={{marginLeft: 'auto'}}>
            <Image style={styles.closeBtn} source={IMAGES_PATH.cancel}/>
          </TouchableOpacity>}
        </View>
      </View>
      <ScrollView>
        {follows && follows.map((item, index) => {
          return tap === 'left' ? <ListItem key={index} bottomDivider>
            {item.avatar_path && <Avatar
              onPress={handleOpen(item)}
              rounded
              source={{uri: ASSET_BASE_URL + item.avatar_path}}/>}
            <ListItem.Content>
              <ListItem.Title>{item.first_name}</ListItem.Title>
              <ListItem.Subtitle>{item.last_name}</ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity onPress={handleDetail(item.id, 'remove')}>
              <Text style={styles.itemBtnRemove}>remove</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDetail(item.id, 'follow')}>
              <Text style={styles.itemBtnFollow}>follow</Text>
            </TouchableOpacity>
          </ListItem> : <ListItem key={index} bottomDivider>
            {item.avatar_path && <Avatar
              onPress={handleOpen(item)}
              rounded
              source={{uri: ASSET_BASE_URL + item.avatar_path}}/>}
            <ListItem.Content>
              <ListItem.Title>{item.first_name}</ListItem.Title>
              <ListItem.Subtitle>{item.last_name}</ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity onPress={handleDetail(item.id, 'unfollow')}>
              <Text style={styles.itemBtnFollow}>unfollow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBtnSettingParent}>
              <Image style={styles.itemBtnSetting} source={IMAGES_PATH.setting}/>
            </TouchableOpacity>
          </ListItem>
        })}
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000060'
          },
          container: {
            backgroundColor: 'transparent'
          },
          draggableIcon: {
            backgroundColor: 'transparent'
          },
        }}
        >
        <View>
          <View style={styles.bottomPopup}>
            <View style={styles.bottomPopupAvatarView}>
              <Avatar style={[styles.bottomPopupAvatar]} rounded source={{uri: ASSET_BASE_URL + profile.avatar_path}}/>
            </View>
            <View style={styles.bottomPopupTitle}>
              <View style={styles.bottomPopupDetail}>
                <Text style={styles.bottomPopupName}>{profile.first_name}</Text>
                <Text style={styles.bottomPopupEmail}>{profile.last_name}</Text>
                <Text style={styles.bottomPopupUnder}>{profile.first_name} of the profile</Text>
              </View>
            </View>
            <View style={[styles.bottomPopupParent]}>
              <TouchableOpacity style={styles.bottomPopupFollowingParent}>
                <Text style={styles.bottomPopupFollowing}>following</Text>
              </TouchableOpacity>
            </View>
            <View style={[gStyle.mt1, styles.d_flex_row, {justifyContent: 'space-around'}]}>
              <TouchableOpacity>
                <View style={styles.center}>
                  <Image style={[styles.bottomImg, styles.m_auto]} source={IMAGES_PATH.power}/>
                </View>
                <Text style={styles.bottomImgText}>
                  View Profile
                </Text>
                <View style={{height: Size(1)}}>

                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.center}>
                  <Image style={[styles.bottomImg, styles.m_auto]} source={IMAGES_PATH.power}/>
                </View>
                <Text style={styles.bottomImgText}>
                  Mute Dennis
                </Text>
                <View style={{height: Size(1)}}>

                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.center}>
                  <Image style={[styles.bottomImg, styles.m_auto]} source={IMAGES_PATH.power}/>
                </View>
                <Text style={styles.bottomImgText}>
                  Chat Dennis
                </Text>
                <View style={{height: Size(1)}}>

                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  )
};

const actions = {
  getFollowList, setFollow
};

const selector = createStructuredSelector({
  follows: followListSelector,
});

export default compose(
  connect(selector, actions)
)(Follow);
