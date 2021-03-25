import {
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  View,
  TextInput
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import * as gStyle from 'src/styles'
import {IMAGES_PATH} from "../../config/constants";
import {ListItem, Avatar, BottomSheet} from 'react-native-elements'
import {Size} from "src/styles";
import {absolute} from "src/styles";

const Follow = ({navigation}) => {

  const list = new Array(15).fill(0);

  const [isDetail, setIsDetail] = useState(false);
  const [tap, setTap] = useState('left');
  const [isEdit, setIsEdit] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {

  }, [])

  const handleChange = (object) => {
    setSearchText(object);

    setIsEdit(object !== '')
  };

  const handleCancel = () => {
    setSearchText('');

    setIsEdit(false)
  };

  const onTap = type => () => {
    setTap(type);
  };

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
    <View>
      <View style={[styles.navbar, styles.d_flex]}>
        <View style={[styles.m_auto, styles.d_flex]}>
          <View style={[styles.centerImg]}>
            <Image style={styles.avatarImg} source={IMAGES_PATH.avatar}/>
          </View>
          <Text style={styles.avatarText}>Jonny Estrada</Text>
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={() => {navigation.goBack()}}>
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
              console.log('okkk')
            }}
          />
          {isEdit && <TouchableOpacity onPress={handleCancel} style={{marginLeft: 'auto'}}>
            <Image style={styles.closeBtn} source={IMAGES_PATH.cancel}/>
          </TouchableOpacity>}
        </View>
      </View>
      <ScrollView style={[gStyle.bgWhite]}>
        {list.map((item, index) => {
          return tap === 'left' ? <ListItem key={index} bottomDivider>
            <Avatar onPress={() => {
              setIsDetail(true)
            }} rounded source={IMAGES_PATH.avatar}></Avatar>
            <ListItem.Content>
              <ListItem.Title>John</ListItem.Title>
              <ListItem.Subtitle>small jon</ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity>
              <Text style={styles.itemBtnRemove}>remove</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.itemBtnFollow}>Follow</Text>
            </TouchableOpacity>
          </ListItem> : <ListItem key={index} bottomDivider>
            <Avatar onPress={() => {
              setIsDetail(true)
            }} rounded source={IMAGES_PATH.avatar}></Avatar>
            <ListItem.Content>
              <ListItem.Title>John</ListItem.Title>
              <ListItem.Subtitle>small jon</ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity>
              <Text style={styles.itemBtnFollow}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBtnSettingParent}>
              <Image style={styles.itemBtnSetting} source={IMAGES_PATH.setting}/>
            </TouchableOpacity>
          </ListItem>
        })}
      </ScrollView>
      <BottomSheet isVisible={isDetail} onPress={() => {setIsDetail(true)}}>
        <View>
          <View style={styles.bottomPopup}>
            <View>
              <TouchableOpacity style={{width: Size(4)}} onPress={() => {setIsDetail(false)}}>
                <Text style={styles.bottomPopupCancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomPopupAvatarView}>
              <Avatar style={[styles.bottomPopupAvatar]} rounded source={IMAGES_PATH.avatar}/>
            </View>
            <View style={styles.bottomPopupTitle}>
              <View style={styles.bottomPopupDetail}>
                <Text style={styles.bottomPopupName}>Dennis Barrett</Text>
                <Text style={styles.bottomPopupEmail}>@DennisBarett</Text>
                <Text style={styles.bottomPopupUnder}>Small bio of the profile</Text>
              </View>
            </View>
            <View style={[styles.bottomPopupParent]}>
              <TouchableOpacity style={styles.bottomPopupFollowingParent}>
                <Text style={styles.bottomPopupFollowing}>following</Text>
              </TouchableOpacity>
            </View>
            <View style={[gStyle.mt2, styles.d_flex_row, {justifyContent: 'space-around'}]}>
              <TouchableOpacity>
                <View style={styles.center}>
                  <Image style={[styles.bottomImg, styles.m_auto]} source={IMAGES_PATH.power}/>
                </View>
                <Text style={styles.bottomImgText}>
                  View Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.center}>
                  <Image style={[styles.bottomImg, styles.m_auto]} source={IMAGES_PATH.power}/>
                </View>
                <Text style={styles.bottomImgText}>
                  Mute Dennis
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.center}>
                  <Image style={[styles.bottomImg, styles.m_auto]} source={IMAGES_PATH.power}/>
                </View>
                <Text style={styles.bottomImgText}>
                  Chat Dennis
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
};

export default Follow;
