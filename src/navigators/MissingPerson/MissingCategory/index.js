import React, { useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import {
  basicPadding,
  bgSecodary,
  bgWhite,
  flexOne,
  flexRow,
  loginHeaderStyle,
  mlp5,
  myAuto,
  p1,
  textXl,
  resizeContain
} from 'src/styles';

import { ASSET_BASE_URL } from 'src/config/apipath';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar } from 'react-native-elements';
import Header from '../components/Header';
import IconButton from 'src/components/IconButton';
import styles from './styles';
import { IMAGES_PATH } from 'src/config/constants';

const MissingCategory = ({ navigation }) => {
  const [avatarPath, setAvatarPath] = useState(null);
  AsyncStorage.getItem('profile').then(profile => setAvatarPath(ASSET_BASE_URL + JSON.parse(profile).avatar_path));

  const handleClose = () => {
    navigation.navigate('Home');
  };

  const handleCategory = index => () => {
    const arrCategory = ['Missing_person', 'Run_Away', 'Endanger_Run_Away', 'Family_Abduction', 'Medical_Fragile_Missing'];

    navigation.navigate('PersonalInfo', { missingType: arrCategory[index] });
  }

  return (
    <View style={styles.root}>
      <ScrollView style={[flexOne, bgWhite]}>
        <View style={styles.body}>
          <View style={styles.item_content}>
            <Image style={styles.top_image} source={IMAGES_PATH.banner} />
            <Text style={styles.top_text}>Make sure to file a missing person's report before or after making this post.</Text>
          </View>

          <TouchableOpacity style={styles.item_category} onPress={handleCategory(0)}>
            <View style={[styles.image_flex]}>
              <Image style={[styles.item_image, resizeContain]} source={IMAGES_PATH.categoryType1} />
            </View>
            <View style={styles.item_text_group}>
                <Text style={styles.item_text}>Missing Person</Text>
                <Text style={styles.item_text_bottom}>A person who has
                disappeared and whose status as alive or dead cannot be confirmed as his or
                her location and fate are not known.
                </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item_category} onPress={handleCategory(1)}>
            <View style={[styles.image_flex]}>
              <Image style={[styles.item_image, resizeContain]} source={IMAGES_PATH.categoryType2} />
            </View>
            <View style={styles.item_text_group}>
                <Text style={styles.item_text}>Run-away</Text>
                <Text style={styles.item_text_bottom}>Person age 17 and below who is
                believed to have left by their own will.
                </Text>
            </View>
          </TouchableOpacity>    
          <TouchableOpacity style={styles.item_category} onPress={handleCategory(2)}>
            <View style={[styles.image_flex]}>
              <Image style={[styles.item_image, resizeContain]} source={IMAGES_PATH.categoryType3} />
            </View>
            <View style={styles.item_text_group}>
                <Text style={styles.item_text}>Endanger run away</Text>
                <Text style={styles.item_text_bottom}>A child who is away
                from home without the permission of his or her parent(s) or legal guardian(s).
                The child may have voluntarily left home for a variety of reasons.
                </Text>
            </View>
          </TouchableOpacity>    
          <TouchableOpacity style={styles.item_category} onPress={handleCategory(3)}>
            <View style={[styles.image_flex]}>
              <Image style={[styles.item_image, resizeContain]} source={IMAGES_PATH.categoryType4} />
            </View>
            <View style={styles.item_text_group}>
                <Text style={styles.item_text}>Family Abduction</Text>
                <Text style={styles.item_text_bottom}>The
                taking, retention, or concealment of a child or children by a parent, other family
                member, custodian, or his or her agent, in derogation of the custody rights,
                including visitation rights, of another parent or family member.
                </Text>
            </View>
          </TouchableOpacity>    
          <TouchableOpacity style={styles.item_category} onPress={handleCategory(4)}>
            <View style={[styles.image_flex]}>
              <Image style={[styles.item_image, resizeContain]} source={IMAGES_PATH.categoryType5} />
            </View>
            <View style={styles.item_text_group}>
                <Text style={styles.item_text}>Medical fragile missing</Text>
                <Text style={styles.item_text_bottom}>A missing person
                who has a medical condition requiring attention and/or medication.
                </Text>
            </View>
          </TouchableOpacity>    
        </View>
      </ScrollView>
    </View>
  )
}

export default MissingCategory;
