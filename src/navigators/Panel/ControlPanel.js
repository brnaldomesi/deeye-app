import React, {Component} from 'react';
import {
  SwitchIOS,
  View,
  Text, TouchableOpacity, Image, ScrollView, TextInput,
} from 'react-native';

import styles from './styles';
import Button from './Button';
import {IMAGES_PATH} from '../../config/constants';
import {Avatar, ListItem, Overlay, BottomSheet} from 'react-native-elements';
import {bgTransparent, Colors, myAuto, Size} from '../../styles';
import {Switch} from 'react-native-elements';
import AntIcon from 'react-native-vector-icons/AntDesign';
import * as RootNavigation from '../Ref';

const ControlPanel = ({closeDrawer}) => {

  const [proxy, setProxy] = React.useState(false);
  const [found, setFound] = React.useState(true);
  const [missing, setMissing] = React.useState(false);
  const [support, setSupport] = React.useState(false);

  const editProfile = (status) => {
    RootNavigation.navigate('Profile Setting');
  }

  const onModal = () => {
    setSupport(!support);
  }

  return (
    <ScrollView style={styles.controlPanel}>
      {/*<Overlay isVisible={support} onBackdropPress={onModal}>*/}
      {/*  <Text>asdfasdfsad</Text>*/}
      {/*</Overlay>*/}
      <BottomSheet isVisible={support}>
        <View style={{width: '100%', backgroundColor: 'white'}}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{paddingHorizontal: 20, paddingVertical: 3, borderRadius: 10, backgroundColor: '#eeeeee'}}>Support Request</Text>
          </View>
          <View style={{alignItems: 'center', width: '100%'}}>
            <TextInput multiline style={{padding: 10, height: 100, width: '80%', marginTop: 10, marginBottom: 5, borderRadius: 5, backgroundColor: '#eeeeee'}}>

            </TextInput>
          </View>
          <View style={{alignItems: 'center', marginTop: 10, marginBottom: 30}}>
            <TouchableOpacity onPress={onModal}>
              <Text style={{paddingHorizontal: 20, paddingVertical: 5, backgroundColor: '#05174f', color: 'white'}}>Send</Text>
            </TouchableOpacity>
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
          zIndex: 1
        }}>
          <Image style={styles.closeBtn} source={IMAGES_PATH.cancel}/>
        </TouchableOpacity>
      </View>
      <View>
        <Avatar style={[styles.bottomPopupAvatar]} rounded/>
        <Text style={{textAlign: 'center', color: '#05174f', fontWeight: 'bold'}}>Jone Doe</Text>
        <Text style={{textAlign: 'center', color: '#05174f', fontSize: 12}}>@Jone Doe</Text>
        <Text style={{
          textAlign: 'center',
          color: '#05174f',
          fontSize: 12,
        }}>asdfasdfasldkfjaslkdfjlkasdjflkjslkdafjkdsla</Text>
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
            <TouchableOpacity onPress={() => {editProfile(true)}} style={{flexGrow: 1}}>
              <Text style={{backgroundColor: 'white', textAlign: 'center', paddingVertical: 4, color: '#05174f'}}>Edit
                Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {editProfile(false)}} style={{flexGrow: 1}}>
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
            <Switch value={proxy} onValueChange={() => {setProxy(!proxy)}}/>
          </ListItem>
          <ListItem style={{height: 50}}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Found Person Alert</ListItem.Title>
            </ListItem.Content>
            <Switch value={found} onValueChange={() => {setFound(!found)}}/>
          </ListItem>
          <ListItem style={{height: 50}}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Missing Person Alert</ListItem.Title>
            </ListItem.Content>
            <Switch value={missing} onValueChange={() => {setMissing(!missing)}}/>
          </ListItem>
          <ListItem style={{height: 50}}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Invite friends and familes</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron style={{color: 'black'}}/>
          </ListItem>
          <TouchableOpacity onPress={onModal}>
            <ListItem style={{height: 50}}>
              <ListItem.Content>
                <ListItem.Title style={{color: '#05174f'}}>Support</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron/>
            </ListItem>
          </TouchableOpacity>
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
          <ListItem style={{height: 50}}>
            <ListItem.Content>
              <ListItem.Title style={{color: '#05174f'}}>Logout</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      </View>
    </ScrollView>
  );
};

export default ControlPanel;
