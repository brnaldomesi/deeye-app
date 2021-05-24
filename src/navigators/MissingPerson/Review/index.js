import * as gConstant from 'src/styles/constants';
import * as gStyle from 'src/styles';

import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createPost, uploadFile} from 'src/redux/modules/posts';

import {ASSET_BASE_URL} from 'src/config/apipath';
import AntIcon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar} from 'react-native-elements';
import {Button} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Divider} from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import {IMAGES_PATH} from 'src/config/constants';
import LinearGradient from 'react-native-linear-gradient';
import MyButton from 'src/components/MyButton';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {getDiffFromToday} from 'src/utils/helpers';
import moment from 'moment';
import {profileSelector} from 'src/redux/modules/auth';
import styles from './styles';

const Review = ({
                  route,
                  navigation,
                  createPost,
                  profile
                }) => {
  const formData = route.params;
  const sourceType = formData.post_type;
  const uri = formData.attachments.length !== 0 ? ASSET_BASE_URL + formData.attachments[0].uri : '';

  const authorName = profile.first_name;
  const updatedAt = profile.update_at;
  const missingContent = '';

  const [missingCollpase, setMissingCollpase] = useState(true);
  const [avatarPath, setAvatarPath] = useState(null);
  const [thumbsize, setThumbsize] = useState({width: Dimensions.get('window').width, height: gConstant.Size(13)});

  AsyncStorage.getItem('profile').then(profile => setAvatarPath(ASSET_BASE_URL + JSON.parse(profile).avatar_path));

  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (width, height) => {
        setThumbsize({width, height});
      }, (error) => {
        console.log('Image getSize', error)
      });
    }
  }, [uri])

  const handleNext = () => {
    createPost({
      data: formData,
      success: res => {
        navigation.navigate('Home');
      },
      fail: err => {
        console.error(err)
      }
    })
  }

  const toggleMissingCollapse = () => {
    setMissingCollpase(missingCollpase => !missingCollpase);
  }

  return (
    <View style={gStyle.flexOne}>
      <Header title="Review Post" step={4}/>
      <ScrollView>
        <View style={[gStyle.bgWhite]}>
          <View style={gStyle.relative}>
            {sourceType === "Video" ? (
              <VideoPlayer
                source={{uri}}
                style={[styles.thumbnail, gStyle.resizeContain]}
                paused={true}
                disableBack
                disableFullscreen
              />
            ) : (
              <TouchableOpacity>
                <FastImage
                  style={{
                    width: Dimensions.get('window').width,
                    height: thumbsize.height * Dimensions.get('window').width / thumbsize.width
                  }}
                  source={{uri}}
                  resizeMode={FastImage.resizeMode.contain}
                />
                {sourceType === 'MissingPerson' &&
                <>
                  <Image style={[styles.badge, gStyle.resizeContain, gStyle.absolute]}
                         source={IMAGES_PATH.verifiedBadge}/>
                  <LinearGradient
                    colors={gStyle.gradientColors}
                    style={[gStyle.absolute, styles.missingDays]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                  >
                    <Text
                      style={gStyle.textWhite}>{'Missing ' + (getDiffFromToday(formData.missing_post.missing_since) === undefined ? '' : getDiffFromToday(formData.missing_post.missing_since)) + ' Now'}</Text>
                  </LinearGradient>
                </>
                }
              </TouchableOpacity>
            )}
          </View>
          <View style={gStyle.p1}>
            <View style={[gStyle.flexRow, gStyle.justifyBetween]}>
              <View style={gStyle.flexRow}>
                <Avatar
                  rounded
                  source={{uri: avatarPath}}
                />
                <View style={gStyle.pl1}>
                  <Text style={[gStyle.primaryColor, gStyle.fontWeightBold]}>{authorName}</Text>
                  <Text>{getDiffFromToday(updatedAt)}</Text>
                </View>
              </View>
              <View>
                <View style={[gStyle.itemsCenter, styles.dotSymbol]}>
                  <Image style={[styles.settingImg, gStyle.resizeCover]} source={IMAGES_PATH.setting}/>
                </View>
              </View>
            </View>
            <View style={[gStyle.pl1, gStyle.mtp5]}>
              {sourceType === 'MissingPerson' ? (
                <>
                  <Text
                    style={[gStyle.textXl, gStyle.fontWeightBold, gStyle.primaryColor]}>{formData.missing_post.fullname}</Text>
                  <Text>AKA {formData.missing_post.aka}</Text>
                </>
              ) : (
                <Text>{formData.missing_post.circumstance}</Text>
              )}
            </View>
            {sourceType === 'MissingPerson' &&
            <View style={gStyle.p1}>
              <Text style={[gStyle.primaryColor, gStyle.fontWeightBold]}>Missing
                From: {formData.missing_post.duo_location}</Text>
              <Text style={[gStyle.primaryColor, gStyle.fontWeightBold]}>Missing
                Since: {moment(formData.missing_post.missing_since).format("dddd, MMMM D, YYYY")}</Text>
              <View style={[gStyle.flexRow, gStyle.justifyBetween, gStyle.mt1]}>
                <View style={gStyle.flexRow}>
                  <View>
                    <Text style={[gStyle.textYellow100, gStyle.fontWeightBold]}>Sex</Text>
                    <Text>{formData.missing_post.sex}</Text>
                  </View>
                  <View style={gStyle.ml1}>
                    <Text style={[gStyle.textYellow100, gStyle.fontWeightBold]}>Age</Text>
                    <Text>{isNaN(moment().year() - moment(formData.missing_post.dob).year()) ? '' : moment().year() - moment(formData.missing_post.dob).year()} Yrs</Text>
                  </View>
                  <View style={gStyle.ml1}>
                    <Text style={[gStyle.textYellow100, gStyle.fontWeightBold]}>Race</Text>
                    <Text>{formData.missing_post.race}</Text>
                  </View>
                  <View style={gStyle.ml1}>
                    <Text style={[gStyle.textYellow100, gStyle.fontWeightBold]}>Height</Text>
                    <Text>{formData.missing_post.height_cm ? formData.missing_post.height_cm + ' cm' : missingContent.height_ft + ' ft'}</Text>
                  </View>
                  <View style={gStyle.ml1}>
                    <Text style={[gStyle.textYellow100, gStyle.fontWeightBold]}>Weight</Text>
                    <Text>{formData.missing_post.weight_kg ? formData.missing_post.weight_kg + ' kg' : formData.missing_post.weight_lb + ' lb'}</Text>
                  </View>
                </View>
                <Button
                  onPress={toggleMissingCollapse}
                  buttonStyle={[gStyle.bgTransparent, gStyle.myAuto]}
                  icon={<AntIcon name={missingCollpase ? "downcircleo" : "upcircleo"} color={gStyle.Colors.yellow100}
                                 size={25}/>}
                />
              </View>
              {!missingCollpase &&
              <>
                <View style={gStyle.flexRow}>
                  <View>
                    <Text style={[gStyle.textYellow100, gStyle.fontWeightBold]}>Eye</Text>
                    <Text>{formData.missing_post.eye}</Text>
                  </View>
                  <View style={gStyle.ml1}>
                    <Text style={[gStyle.textYellow100, gStyle.fontWeightBold]}>Hair</Text>
                    <Text>{formData.missing_post.hair}</Text>
                  </View>
                  <View style={gStyle.ml1}>
                    <Text style={[gStyle.textYellow100, gStyle.fontWeightBold]}>Tattoo</Text>
                    <Text>{formData.missing_post.has_tattoo ? "Yes" : "No"}</Text>
                  </View>
                  <View style={gStyle.ml1}>
                    <Text style={[gStyle.textYellow100, gStyle.fontWeightBold]}>Language</Text>
                    <Text>{formData.missing_post.language}</Text>
                  </View>
                </View>
                <Divider style={[gStyle.bgDivider, styles.bottom_divider]}/>
                <View>
                  <Text style={[gStyle.textXl, gStyle.primaryColor]}>Circumstances</Text>
                  <View style={gStyle.mtp5}>
                    <Text>{formData.missing_post.circumstance}</Text>
                  </View>
                </View>
                <Divider style={[gStyle.bgDivider, styles.bottom_divider]}/>
                <View style={[gStyle.flexRow, gStyle.justifyBetween]}>
                  <View>
                    <Text style={[gStyle.textXl, gStyle.primaryColor]}>Contact</Text>
                    <Text>If you have any information about{"\n"}the whomabout
                      of {formData.missing_post.fullname}</Text>
                  </View>
                  <View style={gStyle.flexRow}>
                    <View>
                      <Image style={[styles.contactImg, styles.selfCenter]} source={IMAGES_PATH.phoneCall}/>
                      <View style={gStyle.mtp5}>
                        <Text>Call</Text>
                      </View>
                    </View>
                    <View style={gStyle.ml1}>
                      <Image style={[styles.contactImg, styles.selfCenter]} source={IMAGES_PATH.openChat}/>
                      <View style={gStyle.mtp5}>
                        <Text>Message</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </>
              }
            </View>
            }
            <Divider style={styles.divider}/>
          </View>
          <View style={[gStyle.mb2, styles.selfCenter]}>
            <Button
              title="Post"
              onPress={handleNext}
              buttonStyle={[gStyle.bgPrimary, gStyle.roundedSm, gStyle.wFull]}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
};

Review.propTypes = {
  createPost: PropTypes.func,
  uploadFile: PropTypes.func,
  profile: PropTypes.object,
}

const actions = {
  createPost,
  uploadFile,
}

const selector = createStructuredSelector({
  profile: profileSelector
});

export default compose(
  connect(selector, actions)
)(Review);
