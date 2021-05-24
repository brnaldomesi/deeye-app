import {
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  View, TextInput,
} from 'react-native';
import {Button, ListItem} from 'react-native-elements';
import React, {useEffect} from 'react';
import styles from './styles';
import * as gStyle from 'src/styles'
import {IMAGES_PATH} from "../../config/constants";
import {compose} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import PropTypes from "prop-types";

import {
  getAlertList,
  alertsListSelector,
  emptyBadgeCount
} from 'src/redux/modules/alert';
import {ASSET_BASE_URL} from "../../config/apipath";
import {getDiffFromToday} from "../../utils/helpers";
import moment from 'moment';
import {getFollowList, setFollow} from '../../redux/modules/follow';

const Setting = () => {

  useEffect(() => {

  }, [])

  return (
    <View style={[styles.container, gStyle.bgWhite]}>
      <ScrollView style={styles.scroll_view}>
        <View style={{padding: 20}}>
          <View style={[gStyle.d_flex, {height: 35}]}>
            <Text style={{width: '40%', paddingTop: 5}}>Name</Text>
            <TextInput style={{width: '60%', padding: 0, fontSize: 12, height: 30, borderBottomColor: '#999999', color: '#05174f', lineHeight: 30, textAlign: 'center', borderBottomWidth: 1}}/>
          </View>
          <View style={[gStyle.d_flex, {height: 35}]}>
            <Text style={{width: '40%', paddingTop: 5}}>Email</Text>
            <TextInput style={{width: '60%', padding: 0, fontSize: 12, height: 30, borderBottomColor: '#999999', color: '#05174f', lineHeight: 30, textAlign: 'center', borderBottomWidth: 1}}/>
          </View>
          <View style={[gStyle.d_flex, {height: 35}]}>
            <Text style={{width: '40%', paddingTop: 5}}>Username</Text>
            <TextInput style={{width: '60%', padding: 0, fontSize: 12, height: 30, borderBottomColor: '#999999', color: '#05174f', lineHeight: 30, textAlign: 'center', borderBottomWidth: 1}}/>
          </View>
          <View style={[gStyle.d_flex, {height: 35}]}>
            <Text style={{width: '40%', paddingTop: 5}}>Phone Number</Text>
            <TextInput style={{width: '60%', padding: 0, fontSize: 12, height: 30, borderBottomColor: '#999999', color: '#05174f', lineHeight: 30, textAlign: 'center', borderBottomWidth: 1}}/>
          </View>
          <View style={[gStyle.d_flex, {height: 35}]}>
            <Text style={{width: '40%', paddingTop: 5}}>Bio</Text>
            <TextInput style={{width: '60%', padding: 0, fontSize: 12, height: 30, borderBottomColor: '#999999', color: '#05174f', lineHeight: 30, textAlign: 'center', borderBottomWidth: 1}}/>
          </View>
          <View>
            <Text style={{textAlign: 'right', fontSize: 10}}>100 letters</Text>
          </View>
          <View style={[gStyle.d_flex, {height: 35, marginTop: 20}]}>
            <Text style={{width: '40%', paddingTop: 5}}>Password</Text>
            <TextInput placeholder={'Enter Current Password'} secureTextEntry={true} style={{width: '60%', padding: 0, fontSize: 12, height: 30, borderBottomColor: '#999999', color: '#05174f', lineHeight: 30, textAlign: 'center', borderBottomWidth: 1}}/>
          </View>
          <View style={[gStyle.d_flex, {height: 35}]}>
            <Text style={{width: '40%', paddingTop: 5}}/>
            <TextInput placeholder={'Enter New Password'} secureTextEntry={true} style={{width: '60%', padding: 0, fontSize: 12, height: 30, borderBottomColor: '#999999', color: '#05174f', lineHeight: 30, textAlign: 'center', borderBottomWidth: 1}}/>
          </View>
          <View style={[gStyle.d_flex, {height: 35}]}>
            <Text style={{width: '40%', paddingTop: 5}}/>
            <TextInput placeholder={'Confirm New Password'} secureTextEntry={true} style={{width: '60%', padding: 0, fontSize: 12, height: 30, borderBottomColor: '#999999', color: '#05174f', lineHeight: 30, textAlign: 'center', borderBottomWidth: 1}}/>
          </View>
          <View style={{alignItems: 'center', marginTop: 60}}>
            <TouchableOpacity>
              <Text style={{padding: 10, backgroundColor: '#05174f', color: 'white'}}>Save update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
};

export default Setting;
