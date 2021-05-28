import React, {Component} from 'react';
import {
  SwitchIOS,
  View,
  Text, TouchableOpacity, Image, ScrollView, TextInput,
} from 'react-native';

import styles from './styles';
import {IMAGES_PATH} from '../../config/constants';
import {Avatar, ListItem, Overlay, BottomSheet} from 'react-native-elements';
import {bgTransparent, Colors, myAuto, Size} from '../../styles';
import {Switch} from 'react-native-elements';
import * as RootNavigation from '../Ref';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {
  setUserNotification,
  setUserSupport,
  getUserInfoCounter,
} from 'src/redux/modules/profiles';

import {
  authLogout
} from 'src/redux/modules/auth'

import {ASSET_BASE_URL} from '../../config/apipath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ControlPanel = ({closeDrawer, authLogout, getUserInfoCounter, setUserSupport, setUserNotification}) => {

  const [proxy, setProxy] = React.useState(false);
  const [found, setFound] = React.useState(true);
  const [missing, setMissing] = React.useState(false);
  const [support, setSupport] = React.useState(false);

  const [follower, serFollower] = React.useState(0);
  const [following, setFollowing] = React.useState(0);
  const [supports, setSupports] = React.useState(0);

  const [avatarPath, setAvatarPath] = React.useState('');
  const [avatarName, setAvatarName] = React.useState('');
  const [avatarId, setAvatarId] = React.useState(0);
  const [avatarEmail, setAvatarEmail] = React.useState('');

  const [detail, setDetail] = React.useState('');
  const [info, setInfo] = React.useState({});

  AsyncStorage.getItem('profile').then(profile => {
    setAvatarPath(ASSET_BASE_URL + JSON.parse(profile).avatar_path);
    setAvatarName(JSON.parse(profile).first_name);
    setAvatarId(JSON.parse(profile).id);
    setAvatarEmail(JSON.parse(profile).email);
  });

  React.useEffect(() => {
    // getUserInfoCounter({
    //   id: avatarId,
    //   success: (res) => {
    //     setInfo(res.user);
    //     serFollower(res.follower);
    //     setFollowing(res.followes);
    //     setSupports(res.supports);
    //
    //     setProxy(res.normalAlert !== 0);
    //     setFound(res.foundAlert !== 0);
    //     setMissing(res.proximityAlert !== 0);
    //   },
    // });

  }, [avatarId]);

  useFocusEffect(
    React.useCallback(
    () => {
      getUserInfoCounter({
        id: avatarId,
        success: (res) => {
          setInfo(res.user);
          serFollower(res.follower);
          setFollowing(res.followes);
          setSupports(res.supports);

          setProxy(res.normalAlert !== 0);
          setFound(res.foundAlert !== 0);
          setMissing(res.proximityAlert !== 0);
        },
      });
    }, [])
  );

  const editProfile = (status) => {
    RootNavigation.navigate('Profile Setting', {id: avatarId, edit: status, info: info});
  };

  const onModal = () => {
    setSupport(!support);
  };

  const onSend = () => {
    setUserSupport({
      id: avatarId,
      data: {detail: detail},
      success: () => {
        setSupport(!support);
      }
    });
  };

  const changeDetail = (val) => {
    setDetail(val);
  };

  const gotoLogout = () => {
    AsyncStorage.clear();
    authLogout();
    RootNavigation.navigateAndSimpleReset('Login');
  };

  return (
    <ScrollView style={styles.controlPanel}>
      <BottomSheet isVisible={support}>
        <View style={{width: '100%', backgroundColor: 'white'}}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{paddingHorizontal: 20, paddingVertical: 3, borderRadius: 10, backgroundColor: '#eeeeee'}}>Support
              Request</Text>
          </View>
          <View style={{alignItems: 'center', width: '100%'}}>
            <TextInput multiline style={{
              padding: 10,
              height: 100,
              width: '80%',
              marginTop: 10,
              marginBottom: 5,
              borderRadius: 5,
              backgroundColor: '#eeeeee',
            }} value={detail} onChangeText={changeDetail}>

            </TextInput>
          </View>
          <View style={{alignItems: 'center', marginTop: 10, marginBottom: 30}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity onPress={onModal}>
                <Text style={{
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  backgroundColor: 'gray',
                  color: 'white',
                }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSend}>
                <Text style={{
                  paddingHorizontal: 20,
                  marginLeft: 10,
                  paddingVertical: 5,
                  backgroundColor: '#05174f',
                  color: 'white',
                }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
      <View>
        <TouchableOpacity onPress={() => {
          closeDrawer();
        }} style={{
          width: Size(3),
          height: Size(3),
          marginLeft: 'auto',
          alignItems: 'center',
          zIndex: 1,
        }}>
          <Image style={styles.closeBtn} source={IMAGES_PATH.cancel}/>
        </TouchableOpacity>
      </View>
      <View>
        <Avatar style={[styles.bottomPopupAvatar]} source={{uri: avatarPath}} rounded/>
        <Text style={{textAlign: 'center', color: '#05174f', fontWeight: 'bold'}}>{avatarName}</Text>
        <Text style={{textAlign: 'center', color: '#05174f', fontSize: 12}}>{avatarEmail}</Text>
        <Text style={{
          textAlign: 'center',
          color: '#05174f',
          fontSize: 12,
        }}></Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
        <View style={{flexGrow: 1}}>
          <View>
            <Text style={{textAlign: 'center', color: '#05174f', fontSize: Size(1.5)}}>0</Text>
            <Text style={{textAlign: 'center', color: '#05174f'}}>Following</Text>
          </View>
        </View>
        <View style={{right: 0, height: '100%', width: 1, backgroundColor: 'black'}}/>

        <View style={{flexGrow: 1}}>
          <View>
            <Text style={{textAlign: 'center', color: '#05174f', fontSize: Size(1.5)}}>0</Text>
            <Text style={{textAlign: 'center', color: '#05174f'}}>Followers</Text>
          </View>
        </View>
        <View style={{right: 0, height: '100%', width: 1, backgroundColor: 'black'}}/>

        <View style={{flexGrow: 1}}>
          <View>
            <Text style={{textAlign: 'center', color: '#05174f', fontSize: Size(1.5)}}>0</Text>
            <Text style={{textAlign: 'center', color: '#05174f'}}>Supports</Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <View style={{alignItems: 'center', borderWidth: 1, borderColor: '#05174f', marginHorizontal: 40}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {
              editProfile(true);
            }} style={{flexGrow: 1}}>
              <Text style={{backgroundColor: 'white', textAlign: 'center', paddingVertical: 4, color: '#05174f'}}>Edit
                Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              editProfile(false);
            }} style={{flexGrow: 1}}>
              <Text style={{backgroundColor: '#05174f', textAlign: 'center', paddingVertical: 4, color: 'white'}}>View
                Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{marginTop: 30, marginBottom: 50}}>
        <View>
          <ListItem style={{height: 50}}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Proximity Alert</ListItem.Title>
            </ListItem.Content>
            <Switch value={proxy} onValueChange={() => {
              setProxy(!proxy);

              setUserNotification({
                id: avatarId,
                params: {
                  proximityAlert: missing === false ? 0 : 1,
                  normalAlert: proxy === false ? 1 : 0,
                  foundAlert: found === false ? 0 : 1,
                },
                success: () => {
                },
              });
            }}/>
          </ListItem>
          <ListItem style={{height: 50}}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Found Person Alert</ListItem.Title>
            </ListItem.Content>
            <Switch value={found} onValueChange={() => {
              setFound(!found);

              setUserNotification({
                id: avatarId,
                params: {
                  proximityAlert: missing === false ? 0 : 1,
                  normalAlert: proxy === false ? 0 : 1,
                  foundAlert: found === false ? 1 : 0,
                },
                success: () => {
                },
              });
            }}/>
          </ListItem>
          <ListItem style={{height: 50}}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Missing Person Alert</ListItem.Title>
            </ListItem.Content>
            <Switch value={missing} onValueChange={() => {
              setMissing(!missing);
              setUserNotification({
                id: avatarId,
                params: {
                  proximityAlert: missing === false ? 1 : 0,
                  normalAlert: proxy === false ? 0 : 1,
                  foundAlert: found === false ? 0 : 1,
                },
                success: () => {

                },
              });
            }}/>
          </ListItem>
          <ListItem style={{height: 50}}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Invite friends and familes</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron style={{color: 'black'}}/>
          </ListItem>
          <ListItem style={{height: 50}} onPress={onModal}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Support</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron/>
          </ListItem>
          <ListItem style={{height: 50}}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Terms of Service</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron/>
          </ListItem>
          <ListItem style={{height: 50}}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Privacy Policy</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron/>
          </ListItem>
          <ListItem style={{height: 50}}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Copyright Policy</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron/>
          </ListItem>
          <ListItem style={{height: 50}} onPress={gotoLogout}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Logout</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      </View>
    </ScrollView>
  );
};

const actions = {
  getUserInfoCounter, setUserSupport, setUserNotification, authLogout
};

export default compose(
  connect(null, actions),
)(ControlPanel);
