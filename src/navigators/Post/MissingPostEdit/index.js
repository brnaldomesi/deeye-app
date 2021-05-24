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
  const [sex, setSex] = useState(missingContent.sex);
  const [age, setAge] = useState(isNaN(moment().year() - moment(missingContent.dob).year()) ? '' : moment().year() - moment(missingContent.dob).year());
  const [race, setRace] = useState(missingContent.race);
  const [height, setHeight] = useState(missingContent.height_cm ? missingContent.height_cm + ' cm' : missingContent.height_ft + ' ft');
  const [weight, setWeight] = useState(missingContent.weight_kg ? missingContent.weight_kg + ' kg' : missingContent.weight_lb + ' lb');
  const [eye, setEye] = useState(missingContent.eye);
  const [hair, setHair] = useState(missingContent.hair);
  const [aka, setAka] = useState(missingContent.aka);
  const [mark, setMark] = useState(missingContent.markinfo);
  const [dob, setDob] = useState(missingContent.dob);
  const [medicalCondition, setMedicalCondition] = useState(missingContent.medical_condition);
  const [tatoo, setTatoo] = useState(missingContent.has_tattoo);
  const [language, setLanguage] = useState(missingContent.language);
  const [contactAgencyName, setContactAgencyName] = useState(missingContent.contactAgencyName);
  const [caseUpload, setCaseUpload] = useState(missingContent.caseUpload);
  const [duoLocation, setDuoLocation] = useState(post.missing_post_content.duo_location);

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
      data: {
        fullname: name, 
        circumstance: cir, 
        contact_phone_number1: number1, 
        contact_phone_number2: number2, 
        sex: sex, 
        age: age, 
        race: race, 
        height: height, 
        weight: weight, 
        eye: eye, 
        hair: hair
      },
      success: () => {
        RootNavigation.navigate('Home');
      }
    });
  }

  const handleEditNavigation = (nav) => {
    const formData = {}
    formData.missing_post = {};
    formData.missing_post.fullname = name;
    formData.missing_post.sex = sex;
    formData.missing_post.height_ft = height.replace(' ft', '').replace(' cm', '');
    formData.missing_post.height_cm = height.replace(' cm', '').replace(' ft', '');
    formData.missing_post.weight_kg = weight.replace(' kg', '').replace(' lb', '');
    formData.missing_post.weight_lb = weight.replace(' lb', '').replace(' kg', '');
    formData.missing_post.hair = hair;
    formData.missing_post.race = race;
    formData.missing_post.eye = eye;
    formData.missing_post.id = post.id;
    formData.missing_post.circumstance = cir;
    formData.missing_post.contact_phone_number1 = number1;
    formData.missing_post.contact_phone_number2 = number2;
    formData.missing_post.aka = aka;
    formData.missing_post.dob = dob;
    formData.missing_post.mark = mark;
    formData.missing_post.medicalCondition = medicalCondition;
    formData.missing_post.tatoo = tatoo;
    formData.missing_post.language = language;
    formData.missing_post.contactAgencyName = contactAgencyName;
    formData.missing_post.caseUpload = caseUpload;
    formData.missing_post.duoLocation = duoLocation;
    RootNavigation.navigate(nav, formData);
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
                setIsName(!isName);
                handleEditNavigation('PersonalInfo');
              }}>
                <Image style={[styles.settingImg, g.resizeCover]} source={IMAGES_PATH.bx_pencil}/>
              </TouchableOpacity>
            </View>
            <View style={[g.flexRow, g.justifyBetween, g.mt1]}>
              <View style={g.flexRow}>
                <View>
                  <Text style={[g.textYellow100, g.fontWeightBold]}>Sex</Text>
                  <TextInput onChangeText={text => setSex(text)}>{sex}</TextInput>
                </View>
                <View style={g.ml1}>
                  <Text style={[g.textYellow100, g.fontWeightBold]}>Age</Text>
                  <TextInput onChangeText={text => setAge(text)}>{age} Yrs</TextInput>
                </View>
                <View style={g.ml1}>
                  <Text style={[g.textYellow100, g.fontWeightBold]}>Race</Text>
                  <TextInput onChangeText={text => setRace(text)}>{race}</TextInput>
                </View>
                <View style={g.ml1}>
                  <Text style={[g.textYellow100, g.fontWeightBold]}>Height</Text>
                  <TextInput onChangeText={text => setHeight(text)}>{height}</TextInput>
                </View>
                <View style={g.ml1}>
                  <Text style={[g.textYellow100, g.fontWeightBold]}>Weight</Text>
                  <TextInput onChangeText={text => setWeight(text)}>{weight}</TextInput>
                </View>
              </View>
            </View>
            <View>
              <View>
                <View style={g.flexRow}>
                  <View>
                    <Text style={[g.textYellow100, g.fontWeightBold]}>Eye</Text>
                    <TextInput onChangeText={text => setEye(text)}>{eye}</TextInput>
                  </View>
                  <View style={g.ml1}>
                    <Text style={[g.textYellow100, g.fontWeightBold]}>Hair</Text>
                    <TextInput onChangeText={text => setHair(text)}>{hair}</TextInput>
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
                handleEditNavigation('CircumstanceInfo');
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
                handleEditNavigation('ContactInfo');
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
            {/* // <Button
            //   title="Update Post"
            //   onPress={handlePush}
            //   buttonStyle={[g.bgPrimary, g.roundedSm, g.wFull]}
            // /> */}
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

