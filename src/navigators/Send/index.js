import * as React from 'react';
import {View, useWindowDimensions, TouchableOpacity, Text, Image, TextInput, ScrollView} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import * as gStyle from "src/styles/styles";
import {IMAGES_PATH} from "../../config/constants";
import {useState} from "react";
import styles from './styles'
import * as RootNavigation from 'src/navigators/Ref';
import {Size} from "../../styles";
import {Avatar, ListItem} from "react-native-elements";
import {ASSET_BASE_URL} from "../../config/apipath";

const FirstRoute = () => (
  <View style={{flex: 1, backgroundColor: '#ff4081'}}/>
);

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}}/>
);

export const Send = ({navigation}) => {

  const [isEdit, setIsEdit] = useState(false);
  const [searchText, setSearchText] = useState('');

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const renderScene = SceneMap({
    first: () =>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <ListItem bottomDivider>
          <Avatar rounded/>
          <ListItem.Content>
            <ListItem.Title>dfgh</ListItem.Title>
            <ListItem.Subtitle>dfgh</ListItem.Subtitle>
          </ListItem.Content>
          <TouchableOpacity>
            <Text style={styles.itemSend}>Send</Text>
          </TouchableOpacity>
        </ListItem>
      </ScrollView>
    ,
    second: () =>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>

      </ScrollView>
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChange = (object) => {
    setSearchText(object);
    setIsEdit(object !== '')
  };

  const handleCancel = () => {
    setSearchText('');
    setIsEdit(false);
  };

  return (
    <>
      <View style={[gStyle.d_flex, {height: Size(4), backgroundColor: 'white'}]}>
        <TouchableOpacity style={{marginStart: 10, marginTop: 'auto', marginBottom: 'auto'}} onPress={handleBack}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <View style={[styles.m_auto, styles.searchBarParent]}>
          <Image style={styles.searchBtn} source={IMAGES_PATH.search}/>
          <TextInput
            placeholder={'Search'}
            style={styles.searchBarInput}
            onChangeText={handleChange}
            multiline={false}
            value={searchText}
            onSubmitEditing={() => {
            }}
          />
          {isEdit && <TouchableOpacity onPress={handleCancel} style={{marginLeft: 'auto'}}>
            <Image style={styles.closeBtn} source={IMAGES_PATH.cancel}/>
          </TouchableOpacity>}
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props =>
          <TabBar
            {...props}
            activeColor={'#05174f'}
            inactiveColor={'gray'}
            style={{backgroundColor: '#eeeeee'}}
            indicatorStyle={{backgroundColor: '#05174f'}}
            tabStyle={{}}
          />
        }
      />
    </>
  );
};