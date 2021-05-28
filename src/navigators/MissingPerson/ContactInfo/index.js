import {
  Colors,
  bgPrimary,
  borderGreen1,
  flexOne,
  flexRow,
  fontWeightBold,
  italic,
  itemsCenter,
  mt1,
  mtp5,
  p1,
  pDot7,
  px1,
  px2,
  pyDot7,
  resizeContain,
  rounded1,
  roundedSm,
  textGreen1,
  textInput,
  textWhite
} from 'src/styles';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { uploadFile } from 'src/redux/modules/posts';
import { updatePost } from 'src/redux/modules/posts';
import { Button } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'
import DocumentPicker from 'react-native-document-picker';
import Header from '../components/Header';
import { IMAGES_PATH } from 'src/config/constants';
import MyButton from 'src/components/MyButton';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import moment from 'moment';

const ContactInfo = ({
  route,
  navigation,
  uploadFile,
  updatePost
}) => {
  const formData = route.params;
  const btn_type = !route.params.post_type? 'update' : 'next';
  const i_fullname = !route.params.post_type? formData.missing_post.fullname : '';
  const i_gender = !route.params.post_type? formData.missing_post.sex : '';
  const i_height = !route.params.missingType && formData.missing_post.height_cm !== 'null'? formData.missing_post.height_cm : '';
  const i_weight = !route.params.missingType && formData.missing_post.height_cm !== 'null'? formData.missing_post.weight_kg : '';
  const i_hair = !route.params.post_type? formData.missing_post.hair : 'Black';
  const i_race = !route.params.post_type? formData.missing_post.race : 'Black';
  const i_eye = !route.params.post_type? formData.missing_post.eye : 'Black';
  const i_circumstance = !route.params.post_type? formData.missing_post.circumstance : '';
  const i_phone1 = !route.params.post_type? formData.missing_post.contact_phone_number1 : '';
  const i_phone2 = !route.params.post_type? formData.missing_post.contact_phone_number2 : '';
  const i_aka = !route.params.post_type? formData.missing_post.aka : '';
  const i_mark = !route.params.post_type? formData.missing_post.mark: '';
  const i_dob = !route.params.post_type? new Date(formData.missing_post.dob): new Date(1598051730000);
  const i_medicalCondition = !route.params.post_type? formData.missing_post.medicalCondition: '';
  const i_tatoo = !route.params.post_type? formData.missing_post.tatoo: '';
  const i_language = !route.params.post_type? formData.missing_post.language: '';
  const i_contactAgencyName = !route.params.post_type? formData.missing_post.contactAgencyName: '';
  const i_caseUpload = !route.params.post_type? formData.missing_post.caseUpload: '';
  const i_duoLocation = !route.params.post_type? formData.missing_post.duoLocation: '';
  const post_id = !route.params.post_type? formData.missing_post.id : '';
  const [aka, setAka] = useState(i_aka);
  const [markinfo, setMarkinfo] = useState(i_mark);
  const [dob, setDob] = useState(i_dob);
  const [medicalCondition, setMedicalCondition] = useState(i_medicalCondition);
  const [language, setLanguage] = useState(i_language);
  const [contactAgencyName, setContactAgencyName] = useState(i_contactAgencyName);
  const [caseUpload, setCaseUpload] = useState(i_caseUpload);
  const [hasTattoo, setHasTattoo] = useState(i_tatoo);
  const [duoLocation, setDuoLocation] = useState(i_duoLocation);
  const [gender, setGender] = useState(i_gender);
  const [height, setHeight] = useState(i_height);
  const [weight, setWeight] = useState(i_weight);
  const [hair, setHair] = useState(i_hair);
  const [race, setRace] = useState(i_race);
  const [eye, setEye] = useState(i_eye);
  const [circumstance, setCircumstance] = useState(i_circumstance);
  const [fullname, setFullname] = useState(i_fullname);
  const [contactPhoneNumber1, setContactPhoneNumber1] = useState(i_phone1);
  const [contactPhoneNumber2, setContactPhoneNumber2] = useState(i_phone2);
  const [agencyName, setAgencyName] = useState('');
  const [phoneNumber1Type, setPhoneNumber1Type] = useState({'police': true, 'fbi': false, 'detective': false});
  const [phoneNumber2Type, setPhoneNumber2Type] = useState({'police': true, 'fbi': false, 'detective': false});
  const [haveRerpot, setHaveRerpot] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [attachments, setAttachments] = useState([]);
  const handleSubmit = () => {
    formData.missing_post.contact_phone_number1 = contactPhoneNumber1;
    formData.missing_post.contact_phone_number2 = contactPhoneNumber2;
    formData.missing_post.contactAgencyName = contactAgencyName;
    formData.missing_post.caseUpload = caseUpload;
    
    if(attachments[0]) {
      formData.missing_post.verification_report_path = attachments[0].uri;
    }
    formData.missing_post.badge_awarded = "Pending";

    navigation.navigate('Review', formData);
  };

  const handleUpload = (data) => {
    const formData = new FormData();
    formData.append('file', data);
    formData.append('file_type', 'Image');
    uploadFile({
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      success: res => {
        const refinedRes = res;
        setAttachments(attachments => attachments.concat([{
          id: refinedRes.id,
          attachment_type: 'General'
        }]));
      },
      fail: err => {
        console.error(err)
      }
    });
  }

  const handleUpdate = () => {
    updatePost({
      id: post_id,
      data: {
        fullname: fullname, 
        sex: gender, 
        race: race, 
        height: height, 
        weight: weight, 
        eye: eye, 
        hair: hair,
        circumstance: circumstance,
        contact_phone_number1: contactPhoneNumber1,
        contact_phone_number2: contactPhoneNumber2,
        aka: aka,
        mark: markinfo,
        dob: moment(dob).format("YYYY-MM-DD hh:mm:ss"),
        medicalCondition: medicalCondition,
        tatoo: hasTattoo,
        language: language,
        contactAgencyName: contactAgencyName,
        caseUpload: caseUpload,
        duoLocation: duoLocation
      },
      success: () => {
        RootNavigation.navigate('Home');
      }
    });
    navigation.navigate('Home');
  }

  const handleUploadPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images]
      });

      setSelectedFileName(result.name);
      handleUpload(result)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  const handleType1 = useCallback((type) => (e) => {
    if(type === 'police')
      setPhoneNumber1Type({'police': true, 'fbi': false, 'detective': false});
    else if(type === 'fbi')
      setPhoneNumber1Type({'police': false, 'fbi': true, 'detective': false});
    else
      setPhoneNumber1Type({'police': false, 'fbi': false, 'detective': true});
  }, []);
  
  const handleType2 = useCallback((type) => (e) => {
    if(type === 'police')
      setPhoneNumber2Type({'police': true, 'fbi': false, 'detective': false});
    else if(type === 'fbi')
      setPhoneNumber2Type({'police': false, 'fbi': true, 'detective': false});
    else
      setPhoneNumber2Type({'police': false, 'fbi': false, 'detective': true});
  }, []);
  
  return (
    <View style={flexOne}>
      <Header title="Contact Information" step={3} />
      <ScrollView>
        <View style={p1}>
          <View
            style={[
              rounded1,
              styles.contactImgView
            ]}
          >
            <Image
              style={[styles.contactImg, resizeContain]}
              source={IMAGES_PATH.onboardingRealTime}
            />
            <View style={[bgPrimary, px1, pyDot7, styles.contactDesc]}>
              <Text style={[textWhite, fontWeightBold]}>Give contact information of the officer {"\n"} in-charge of the case or your active line. {"\n"} (All most cases both phone lines)</Text>
            </View>
          </View>

          <TextInput
            value={contactPhoneNumber1}
            onChangeText={ text => setContactPhoneNumber1(text) }
            style={[textInput, mt1]}
            keyboardType='numeric'
            placeholder="Phone number"
          />

          <View style={flexRow}>
            <CheckBox
              title='Police Department'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={phoneNumber1Type.police}
              onPress={handleType1('police')}
              containerStyle={{ backgroundColor: 'transparent', marginLeft: -10, marginRight: -10}}
              checkedColor={Colors.primary}
            />
            <CheckBox
              title='FBI'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={phoneNumber1Type.fbi}
              onPress={handleType1('fbi')}
              containerStyle={{backgroundColor: 'transparent', marginLeft: -10, marginRight: -10}}
              checkedColor={Colors.primary}
            />
            <CheckBox
              title='Detective'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={phoneNumber1Type.detective}
              onPress={handleType1('detective')}
              containerStyle={{backgroundColor: 'transparent', marginLeft: -10}}
              checkedColor={Colors.primary}
            />
          </View>

          <TextInput
            value={contactPhoneNumber2}
            onChangeText={ text => setContactPhoneNumber2(text) }
            style={textInput}
            keyboardType='numeric'
            placeholder="Phone number"
          />

          <View style={flexRow}>
            <CheckBox
              title='Police Department'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={phoneNumber2Type.police}
              onPress={handleType2('police')}
              containerStyle={{ backgroundColor: 'transparent', marginLeft: -10, marginRight: -10}}
              checkedColor={Colors.primary}
            />
            <CheckBox
              title='FBI'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={phoneNumber2Type.fbi}
              onPress={handleType2('fbi')}
              containerStyle={{backgroundColor: 'transparent', marginLeft: -10, marginRight: -10}}
              checkedColor={Colors.primary}
            />
            <CheckBox
              title='Detective'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={phoneNumber2Type.detective}
              onPress={handleType2('detective')}
              containerStyle={{backgroundColor: 'transparent', marginLeft: -10}}
              checkedColor={Colors.primary}
            />
          </View>

          <TextInput
            value={contactAgencyName}
            onChangeText={ text => setContactAgencyName(text) }
            style={textInput}
            keyboardType='default'
            placeholder="Agency Name"
          />

          <View style={flexRow}>
            <CheckBox
              title='Agency Name'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!agencyName}
              onPress={() => setAgencyName(false)}
              containerStyle={{ backgroundColor: 'transparent'}}
              checkedColor={Colors.primary}
            />
            <CheckBox
              title='Detective Name'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={agencyName}
              onPress={() => setAgencyName(true)}
              containerStyle={{backgroundColor: 'transparent'}}
              checkedColor={Colors.primary}
            />
          </View>
 
          <TextInput
            value={caseUpload}
            onChangeText={ text => setCaseUpload(text) }
            style={textInput}
            keyboardType='default'
            placeholder="Case Info"
          />

          <View
            style={[
              roundedSm,
              mt1,
              pDot7,
              borderGreen1
            ]}
          >
            <Text style={[textGreen1, fontWeightBold]}>Do you have a missing person report?</Text>
            <View style={flexRow}>
              <CheckBox
                title='No'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={!haveRerpot}
                onPress={() => setHaveRerpot(false)}
                containerStyle={{ backgroundColor: 'transparent'}}
                checkedColor={Colors.green1}
              />
              <CheckBox
                title='Yes'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={haveRerpot}
                onPress={() => setHaveRerpot(true)}
                containerStyle={{backgroundColor: 'transparent'}}
                checkedColor={Colors.green1}
              />
            </View>

            {haveRerpot &&
              <View style={itemsCenter}>
                <View>
                  <Text>{selectedFileName}</Text>
                </View>
                <MyButton onPress={handleUploadPick}>
                  <Image
                    style={[styles.square, resizeContain]}
                    source={IMAGES_PATH.fileUploadGreen}
                  />
                </MyButton>
                <Text style={[mtp5, textGreen1, italic]}>PDF, JEPG & PNG</Text>
              </View>
            }
          </View>

          <View style={[mt1, itemsCenter]}>
            {btn_type === 'next'?
              <Button
                title="Finish for review"
                onPress={handleSubmit}
                buttonStyle={[bgPrimary, roundedSm, px2]}
              /> : 
              <Button
                title="Update Post"
                onPress={handleUpdate}
                buttonStyle={[bgPrimary, roundedSm, px2]}
              />
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
};

ContactInfo.propTypes = {
  uploadFile: PropTypes.func
};

const actions = {
  uploadFile,
  updatePost
};

export default compose(
  connect(null, actions)
)(ContactInfo);
