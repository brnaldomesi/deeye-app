import {
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  View, TextInput,
} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import * as gStyle from 'src/styles';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {
  setUserInfoUpdate,
} from 'src/redux/modules/profiles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({route, navigation, setUserInfoUpdate}) => {

  const [id, setId] = React.useState(0);

  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const phoneRef = React.useRef(null);
  const bioRef = React.useRef(null);

  const currentPwd = React.useRef(null);
  const newPwd = React.useRef(null);
  const confirmPwd = React.useRef(null);

  const [name, setName] = React.useState(route.params.info.name);
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState(route.params.info.number);
  const [bio, setBio] = React.useState(route.params.info.bio);

  const [current, setCurrent] = React.useState('');
  const [news, setNews] = React.useState('');
  const [confirm, setConfirm] = React.useState('');

  const [isMe, setIsMe] = React.useState(false);

  useEffect(() => {
    AsyncStorage.getItem('profile').then(profile => {
      setEmail(JSON.parse(profile).email);
      setIsMe(JSON.parse(profile).id === route.params.id && route.params.edit);
      setId(JSON.parse(profile).id);
    });
    }, []);

  const handleUpdate = () => {
    if (name === '') {
      nameRef.current.focus();
    } else if (email === '') {
      emailRef.current.focus();
    // } else if (phone === '') {
    //   phoneRef.current.focus();
    // } else if (bio === '') {
    //   bio.current.focus();
    } else if (current === '') {
      currentPwd.current.focus();
    } else if (news === '') {
      newPwd.current.focus();
    } else if (news !== confirm) {
      confirmPwd.current.focus();
    } else {
      setUserInfoUpdate({
        id: id,
        data: {
          name: name,
          email: email,
          phoneNumber: phone,
          bio: bio,
          oldPwd: current,
          newPwd: news,
        },
        success: () => {
          navigation.goBack();
        },
        fail: () => {
          alert('failed info!');
        }
      })
    }
  }

  return (
    <View style={[styles.container, gStyle.bgWhite]}>
      <ScrollView style={styles.scroll_view}>
        <View style={{padding: 20}}>
          <View style={[gStyle.d_flex, {height: 35}]}>
            <Text style={{width: '40%', paddingTop: 5}}>Name</Text>
            <TextInput
              ref={c => nameRef.current = c}
              onChangeText={text => setName(text)}
              value={name}
              style={{
              width: '60%',
              padding: 0,
              fontSize: 18,
              height: 30,
              borderBottomColor: '#999999',
              color: '#05174f',
              lineHeight: 30,
              textAlign: 'center',
              borderBottomWidth: 1,
            }}/>
          </View>
          <View style={[gStyle.d_flex, {height: 35}]}>
            <Text style={{width: '40%', paddingTop: 5}}>Email</Text>
            <TextInput
              ref={c => emailRef.current = c}
              onChangeText={text => setEmail(text)}
              value={email}
              style={{
              width: '60%',
              padding: 0,
              fontSize: 18,
              height: 30,
              borderBottomColor: '#999999',
              color: '#05174f',
              lineHeight: 30,
              textAlign: 'center',
              borderBottomWidth: 1,
            }}/>
          </View>
          <View style={[gStyle.d_flex, {height: 35}]}>
            <Text style={{width: '40%', paddingTop: 5}}>Phone Number</Text>
            <TextInput
              ref={c => phoneRef.current = c}
              onChangeText={text => setPhone(text)}
              value={phone}
              keyboardType={'numeric'}
              style={{
              width: '60%',
              padding: 0,
              fontSize: 18,
              height: 30,
              borderBottomColor: '#999999',
              color: '#05174f',
              lineHeight: 30,
              textAlign: 'center',
              borderBottomWidth: 1,
            }}/>
          </View>
          <View style={[gStyle.d_flex, {height: 35}]}>
            <Text style={{width: '40%', paddingTop: 5}}>Bio</Text>
            <TextInput
              ref={c => bioRef.current = c}
              onChangeText={text => setBio(text)}
              value={bio}
              style={{
              width: '60%',
              padding: 0,
              fontSize: 18,
              height: 30,
              borderBottomColor: '#999999',
              color: '#05174f',
              lineHeight: 30,
              textAlign: 'center',
              borderBottomWidth: 1,
            }}/>
          </View>
          <View>
            <Text style={{textAlign: 'right', fontSize: 10}}>100 letters</Text>
          </View>
          {isMe && <View>
            <View style={[gStyle.d_flex, {height: 35, marginTop: 20}]}>
              <Text style={{width: '40%', paddingTop: 5}}>Password</Text>
              <TextInput
                ref={c => currentPwd.current = c}
                onChangeText={text => setCurrent(text)}
                value={current}
                placeholder={'Enter Current Password'} secureTextEntry={true} style={{
                width: '60%',
                padding: 0,
                fontSize: 18,
                height: 30,
                borderBottomColor: '#999999',
                color: '#05174f',
                lineHeight: 30,
                textAlign: 'center',
                borderBottomWidth: 1,
              }}/>
            </View>
            <View style={[gStyle.d_flex, {height: 35}]}>
              <Text style={{width: '40%', paddingTop: 5}}/>
              <TextInput
                ref={c => newPwd.current = c}
                onChangeText={text => setNews(text)}
                value={news}
                placeholder={'Enter New Password'} secureTextEntry={true} style={{
                width: '60%',
                padding: 0,
                fontSize: 18,
                height: 30,
                borderBottomColor: '#999999',
                color: '#05174f',
                lineHeight: 30,
                textAlign: 'center',
                borderBottomWidth: 1,
              }}/>
            </View>
            <View style={[gStyle.d_flex, {height: 35}]}>
              <Text style={{width: '40%', paddingTop: 5}}/>
              <TextInput
                ref={c => confirmPwd.current = c}
                onChangeText={text => setConfirm(text)}
                value={confirm}
                placeholder={'Confirm New Password'} secureTextEntry={true} style={{
                width: '60%',
                padding: 0,
                fontSize: 18,
                height: 30,
                borderBottomColor: '#999999',
                color: '#05174f',
                lineHeight: 30,
                textAlign: 'center',
                borderBottomWidth: 1,
              }}/>
            </View>
          </View>}
          {isMe && <View style={{alignItems: 'center', marginTop: 60}}>
            <TouchableOpacity onPress={handleUpdate}>
              <Text style={{padding: 10, backgroundColor: '#05174f', color: 'white'}}>Save update</Text>
            </TouchableOpacity>
          </View>}
        </View>
      </ScrollView>
    </View>
  );
};

const actions = {
  setUserInfoUpdate,
};

export default compose(
  connect(null, actions),
)(Setting);
