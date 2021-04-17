import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {updatePost} from 'src/redux/modules/posts';
import * as g from "../../../styles";
import {Avatar, Button, Divider} from "react-native-elements";
import styles from './styles';
import {ASSET_BASE_URL} from "../../../config/apipath";
import {getDiffFromToday} from "../../../utils/helpers";
import VideoPlayer from "react-native-video-controls";
import FastImage from "react-native-fast-image";
import {IMAGES_PATH} from "../../../config/constants";
import LinearGradient from "react-native-linear-gradient";
import {createStructuredSelector} from "reselect";
import {profileSelector} from "../../../redux/modules/auth";
import PopupBlurMenu from "../../../components/PopupBlurMenu";
import moment from 'moment';
import AntIcon from "react-native-vector-icons/AntDesign";
import {switchCase} from "@babel/types";
import * as RootNavigation from "../../Ref";

const MissingPostEdit = ({
                           route,
                           updatePost
                         }) => {
  const {post} = route.params;

  const postType = post.post_type;
  const sourceType = postType === 'Share' ? post.post_source.post_type : postType
  const missingContent = postType === 'Share' ? post.post_source.missing_post_content : post.missing_post_content;
  const postAttachment = postType === 'Share' ? post.post_source.post_attachments[0] : post.post_attachments[0];
  const uri = postAttachment ? ASSET_BASE_URL + postAttachment.path : undefined;
  const updatedAt = postType === 'Share' ? post.post_source.updated_at : post.updated_at;
  const description = postType === 'Share' ? post.post_source.description : post.description;
  const avatarPath = postType === 'Share' ? ASSET_BASE_URL + post.post_source.author.avatar_path : ASSET_BASE_URL + post.author.avatar_path;

  const [thumbsize, setThumbsize] = useState({width: Dimensions.get('window').width, height: g.Size(13)});

  const [isName, setIsName] = useState(false);
  const [name, setName] = useState(missingContent.fullname);
  const [isCir, setIsCir] = useState(false);
  const [cir, setCir] = useState(missingContent.circumstance);
  const [isNumber, setIsNumber] = useState(false);
  const [number1, setNumber1] = useState(missingContent.contact_phone_number1);
  const [number2, setNumber2] = useState(missingContent.contact_phone_number2);

  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (width, height) => {
        setThumbsize({width, height});
      }, (error) => {
        console.log('Image getSize', error)
      });
    }
  }, [uri]);

  const handlePush = () => {
    updatePost({
      id: post.id,
      data: {fullname: name, circumstance: cir, contact_phone_number1: number1, contact_phone_number2: number2},
      success: () => {
        RootNavigation.navigate('Home');
      }
    });
  }

  return (
    <View style={[g.bgWhite]}>
      <ScrollView>
        <View>
          {postType === 'Share' &&
          <View>
            <Button
              type="clear"
              title="Shared by"
              disabled
              buttonStyle={[g.p0, g.m0, styles.sharedby]}
            />
            <View style={[g.flexRow, g.mtp5]}>
              <Avatar
                rounded
                source={{uri: ASSET_BASE_URL + post.author.avatar_path}}
              />
              <View style={[g.mlp5, g.flexOne]}>
                <TouchableOpacity>
                  <Text
                    style={[g.primaryColor, g.fontWeightBold]}>{post.author.first_name + ' ' + post.author.last_name}</Text>
                  <Text>{getDiffFromToday(post.updated_at)}</Text>
                  <Text style={g.mt1}>{post.description}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          }
          <View style={g.relative}>
            {sourceType === "Video" ? (
              <VideoPlayer
                source={{uri}}
                style={[styles.thumbnail, g.resizeContain]}
                paused={true}
                disableBack
                disableFullscreen
              />
            ) : (
              <View>
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
                  <PopupBlurMenu post={post} isMyPost={true}/>
                  <LinearGradient
                    colors={g.gradientColors}
                    style={[styles.absolute, styles.missingDays]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                  >
                    <Text
                      style={g.textWhite}>{'Missing ' + getDiffFromToday(missingContent.missing_since) + ' Now'}</Text>
                  </LinearGradient>
                </>
                }
              </View>
            )}
          </View>
          <View style={g.p1}>
            <View style={[g.flexRow, g.justifyBetween]}>
              <View style={{width: '90%'}}>
                <TextInput onChangeText={text => {
                  setName(text)
                }}
                           value={name}
                           multiline={true}
                           editable={isName}
                           style={[styles.height_name, styles.f_name, g.fontWeightBold, g.primaryColor]}/>
                <Text style={[styles.f_detail, g.fontWeightBold, g.secondaryColor]}>Missing
                  From: {missingContent.duo_location}</Text>
                <Text style={[styles.f_detail, g.fontWeightBold, g.secondaryColor]}>Missing
                  Since: {moment(missingContent.missing_since).format("dddd, MMMM D, YYYY")}</Text>
              </View>
              <TouchableOpacity onPress={() => {
                setIsName(!isName)
              }}>
                <Image style={[styles.settingImg, g.resizeCover]} source={IMAGES_PATH.bx_pencil}/>
              </TouchableOpacity>
            </View>
            <View style={[g.flexRow, g.justifyBetween, g.mt1]}>
              <View style={g.flexRow}>
                <View>
                  <Text style={[g.textYellow100, g.fontWeightBold]}>Sex</Text>
                  <Text>{missingContent.sex}</Text>
                </View>
                <View style={g.ml1}>
                  <Text style={[g.textYellow100, g.fontWeightBold]}>Age</Text>
                  <Text>{isNaN(moment().year() - moment(missingContent.dob).year()) ? '' : moment().year() - moment(missingContent.dob).year()} Yrs</Text>
                </View>
                <View style={g.ml1}>
                  <Text style={[g.textYellow100, g.fontWeightBold]}>Race</Text>
                  <Text>{missingContent.race}</Text>
                </View>
                <View style={g.ml1}>
                  <Text style={[g.textYellow100, g.fontWeightBold]}>Height</Text>
                  <Text>{missingContent.height_cm ? missingContent.height_cm + ' cm' : missingContent.height_ft + ' ft'}</Text>
                </View>
                <View style={g.ml1}>
                  <Text style={[g.textYellow100, g.fontWeightBold]}>Weight</Text>
                  <Text>{missingContent.weight_kg ? missingContent.weight_kg + ' kg' : missingContent.weight_lb + ' lb'}</Text>
                </View>
              </View>
            </View>
            <View>
              <View>
                <View style={g.flexRow}>
                  <View>
                    <Text style={[g.textYellow100, g.fontWeightBold]}>Eye</Text>
                    <Text>{missingContent.eye}</Text>
                  </View>
                  <View style={g.ml1}>
                    <Text style={[g.textYellow100, g.fontWeightBold]}>Hair</Text>
                    <Text>{missingContent.hair}</Text>
                  </View>
                  <View style={g.ml1}>
                    <Text style={[g.textYellow100, g.fontWeightBold]}>Tattoo</Text>
                    <Text>{missingContent.has_tattoo ? "Yes" : "No"}</Text>
                  </View>
                  <View style={g.ml1}>
                    <Text style={[g.textYellow100, g.fontWeightBold]}>Language</Text>
                    <Text>{missingContent.language}</Text>
                  </View>
                </View>
              </View>
            </View>
            <Divider style={[g.bgDivider, styles.bottom_divider]}/>
            <View style={[g.flexRow, g.justifyBetween]}>
              <View style={[{width: '90%'}]}>
                <Text style={[g.primaryColor, styles.f_title]}>Circumstance</Text>
                <View style={{width: '100%'}}>
                  <TextInput onChangeText={text => {
                    setCir(text)
                  }}
                             value={cir}
                             returnKeyType="go"
                             editable={isCir}
                             multiline={true}
                             style={[g.secondaryColor, styles.mt5, styles.f_content]}/>
                </View>
              </View>
              <TouchableOpacity onPress={() => {
                setIsCir(!isCir)
              }}>
                <Image style={[styles.settingImg, g.resizeCover]} source={IMAGES_PATH.bx_pencil}/>
              </TouchableOpacity>
            </View>
            <Divider style={[g.bgDivider, styles.bottom_divider]}/>
            <View style={[g.flexRow, g.justifyBetween]}>
              <View style={[{flexShrink: .7}]}>
                <View style={[g.d_flex, g.wFull]}>
                  <View style={styles.w_half}>
                    <Text style={g.grayColor}>Police Department</Text>
                  </View>
                  <View style={styles.w_half}>
                    <TextInput onChangeText={text => {
                      setNumber2(text)
                    }}
                               value={number2}
                               returnKeyType="go"
                               editable={isNumber}
                               keyboardType={'number-pad'}
                               style={[styles.height_number, g.grayColor, g.fontWeightBold]}/>
                  </View>
                </View>
                <View style={[g.d_flex, g.wFull, styles.mt5]}>
                  <View style={styles.w_half}>
                    <Text style={g.grayColor}>Case Officer</Text>
                  </View>
                  <View style={[styles.w_half]}>
                    <TextInput onChangeText={text => {
                      setNumber1(text)
                    }}
                               value={number1}
                               returnKeyType="go"
                               editable={isNumber}
                               keyboardType={'number-pad'}
                               style={[styles.height_number, g.grayColor, g.fontWeightBold]}/>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => {
                setIsNumber(!isNumber)
              }}>
                <Image style={[styles.settingImg, g.resizeCover]} source={IMAGES_PATH.bx_pencil}/>
              </TouchableOpacity>
            </View>
            <View style={[g.flexRow, g.justifyBetween, g.mt1]}>
              <View style={[{flexShrink: .7}]}>
                <View style={[g.d_flex, g.wFull]}>
                  <View style={styles.w_70}>
                    <Text style={g.textRed}>Missing Person/Police Report</Text>
                  </View>
                  <View style={styles.w_30}>
                    <Text style={[g.textRed, g.fontWeightBold]}>No</Text>
                  </View>
                </View>
                <View>
                  <Text style={[styles.w_70, g.secondaryColor, styles.mt5, styles.f_report]}>missing post is very good
                    missing post is very good missing post is very good missing post is very good</Text>
                </View>
              </View>
            </View>
            <Divider style={[g.bgDivider, styles.bottom_divider]}/>
          </View>
          <View style={[g.mb2, styles.selfCenter]}>
            <Button
              title="Update Post"
              onPress={handlePush}
              buttonStyle={[g.bgPrimary, g.roundedSm, g.wFull]}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
};

const actions = {
  updatePost
};

const selector = createStructuredSelector({
  profile: profileSelector
});

export default compose(
  connect(selector, actions)
)(MissingPostEdit);

