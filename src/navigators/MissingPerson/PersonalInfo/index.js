import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
  Picker
} from 'react-native';
import React, { useState, useCallback } from 'react';
import {updatePost} from 'src/redux/modules/posts';
import {
  Size,
  absolute,
  bgPrimary,
  bgWhite,
  borderPrimary,
  flexOne,
  flexRow,
  itemsCenter,
  itemsStart,
  justifyCenter,
  ml1,
  mlSm,
  mlXs,
  mt1,
  mt2,
  mtp5,
  p1,
  primaryColor,
  px2,
  relative,
  resizeContain,
  roundedSm,
  textInput,
  textWhite,
  w80P
} from 'src/styles';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import Header from '../components/Header';
import { IMAGES_PATH } from 'src/config/constants';
import MyButton from 'src/components/MyButton';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './styles';
import { uploadFile } from 'src/redux/modules/posts';

const PersonalInfo = ({navigation, uploadFile, route, updatePost}) => {
  const formData = route.params;
  const btn_type = !route.params.missingType? 'update' : 'next';
  const i_fullname = !route.params.missingType? formData.missing_post.fullname : '';
  const i_gender = !route.params.missingType? formData.missing_post.sex : '';
  const i_height = !route.params.missingType? formData.missing_post.height_cm : '';
  const i_weight = !route.params.missingType? formData.missing_post.weight_kg : '';
  const i_hair = !route.params.missingType? formData.missing_post.hair : 'Black';
  const i_race = !route.params.missingType? formData.missing_post.race : 'Black';
  const i_eye = !route.params.missingType? formData.missing_post.eye : 'Black';
  const i_circumstance = !route.params.missingType? formData.missing_post.circumstance : '';
  const i_phone1 = !route.params.missingType? formData.missing_post.contact_phone_number1 : '';
  const i_phone2 = !route.params.missingType? formData.missing_post.contact_phone_number2 : '';
  const post_id = !route.params.missingType? formData.missing_post.id : '';
  const i_aka = !route.params.missingType? formData.missing_post.aka : '';
  const i_mark = !route.params.missingType? formData.missing_post.mark: '';
  const i_dob = !route.params.missingType? new Date(formData.missing_post.dob): new Date(1598051730000);
  const i_medicalCondition = !route.params.missingType? formData.missing_post.medicalCondition: '';
  const i_tatoo = !route.params.missingType? formData.missing_post.tatoo: '';
  const i_language = !route.params.missingType? formData.missing_post.language: '';
  const i_contactAgencyName = !route.params.missingType? formData.missing_post.contactAgencyName: '';
  const i_caseUpload = !route.params.missingType? formData.missing_post.caseUpload: '';
  const i_duoLocation = !route.params.missingType? formData.missing_post.duoLocation: '';
  const [fullname, setFullname] = useState(i_fullname);
  const [aka, setAka] = useState(i_aka);
  const [gender, setGender] = useState(i_gender);
  const [height, setHeight] = useState(i_height);
  const [weight, setWeight] = useState(i_weight);
  const [markinfo, setMarkinfo] = useState(i_mark);
  const [dob, setDob] = useState(i_dob);
  const [duoLocation, setDuoLocation] = useState(i_duoLocation);
  const [heightUnit, setHeightUnit] = useState('ft');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [hair, setHair] = useState(i_hair);
  const [race, setRace] = useState(i_race);
  const [eye, setEye] = useState(i_eye);
  const [circumstance, setCircumstance] = useState(i_circumstance);
  const [number1, setNumber1] = useState(i_phone1);
  const [number2, setNumber2] = useState(i_phone2);
  const [selectedFileNames, setSelectedFileNames] = useState('');
  const [medicalCondition, setMedicalCondition] = useState(i_medicalCondition);
  const [tatoo, setTatoo] = useState(i_tatoo);
  const [language, setLanguage] = useState(i_language);
  const [contactAgencyName, setContactAgencyName] = useState(i_contactAgencyName);
  const [caseUpload, setCaseUpload] = useState(i_caseUpload);
  const [showDatePicker, setShowDatePicer] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const { missingType } = route.params;

  const handleNext = () => {
    const formData = {}
    formData.missing_post = {};
    formData.missing_post.missing_type = missingType;
    formData.missing_post.fullname = fullname;
    formData.missing_post.aka = aka;
    formData.missing_post.sex = gender;
    formData.missing_post.markinfo = markinfo;
    if(heightUnit === 'ft') {
      formData.missing_post.height_ft = height;
    } else {
      formData.missing_post.height_cm = height;
    }
    if(weightUnit === 'kg') {
      formData.missing_post.weight_kg = weight;
    } else {
      formData.missing_post.weight_lb = weight;
    }
    formData.missing_post.hair = hair;
    formData.missing_post.race = race;
    formData.missing_post.eye = eye;
    formData.missing_post.medicalCondition = medicalCondition;
    formData.missing_post.dob = moment(dob).format("YYYY-MM-DD hh:mm:ss");
    formData.attachments = attachments;
    formData.post_type = "MissingPerson";
    navigation.navigate('CircumstanceInfo', formData)
  };

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
        contact_phone_number1: number1,
        contact_phone_number2: number2,
        aka: aka,
        mark: markinfo,
        dob: moment(dob).format("YYYY-MM-DD hh:mm:ss"),
        medicalCondition: medicalCondition,
        tatoo: tatoo,
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
          uri: refinedRes.path,
          type: refinedRes.file_type,
          attachment_type: 'General'
        }]));
      },
      fail: err => {
        console.error(err)
      }
    });
  }

  const handleUploadPick = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images]
      });

      let fileNames = ''
      for (const res of results) {
        fileNames += res.name + ', '
      }
      setSelectedFileNames(fileNames.slice(0, -2));
      handleUpload(results[0])
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  const handleDob = () => {
    setShowDatePicer(true);
  }

  const handleDobChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicer(Platform.OS === 'ios');
    setDob(currentDate);
  }

  const handleHeightCm = () => {
    // if(heightUnit === 'ft' & height !== null) {
    //   setHeight((height * 30.48).toFixed(0))
    // }
    setHeightUnit('cm')
  }

  const handleHeightFt = () => {
    // if(heightUnit === 'cm' & height !== null) {
    //   setHeight((height / 30.48).toFixed(1))
    // }
    setHeightUnit('ft')
  }

  const handleWeightKg = () => {
    // if(weightUnit === 'lb' & weight !== null) {
    //   setWeight((weight * 0.45).toFixed(0))
    // }
    setWeightUnit('kg')
  }

  const handleWeightLb = () => {
    // if(weightUnit === 'kg' & weight !== null) {
    //   setWeight((weight / 0.45).toFixed(1))
    // }
    setWeightUnit('lb')
  }
  return (
    <View style={flexOne}>
      <Header title="Personal Information" step={1} />
      <ScrollView>
        <View style={p1}>
          <View
            style={[
              itemsCenter,
              justifyCenter,
              relative,
              styles.pickView
            ]}
          >
            <Text>{selectedFileNames}</Text>
            <MyButton onPress={handleUploadPick}>
              <Image
                style={[styles.square, resizeContain]}
                source={IMAGES_PATH.fileUploadBlue}
              />
            </MyButton>
            <Text style={[absolute, styles.uploadSubscription]}>Upload images of the missing Person up to 4 images</Text>
          </View>
          <View style={mt1}>
            <Text>Full Name</Text>
          </View>
          <View style={mtp5}>
            <TextInput
              value={fullname}
              onChangeText={ text => setFullname(text) }
              style={textInput}
              placeholder="Name of the missing person"
            />
          </View>
          <View style={mt1}>
            <Text>AKA</Text>
          </View>
          <View style={mtp5}>
            <TextInput
              value={aka}
              onChangeText={ text => setAka(text) }
              style={textInput}
              placeholder="Also Knows As"
            />
          </View>

          <View style={[mt1, flexRow]}>
            <View style={flexOne}>
              <Text>Age (Date of Birthday)</Text>
              <View style={flexRow}>
                <MyButton onPress={handleDob} style={[mtp5, itemsStart]}>
                  <Image
                    style={[styles.square, resizeContain]}
                    source={IMAGES_PATH.featherCalendar}
                  />
                </MyButton>
                <View style={[justifyCenter, ml1]}>
                  <TextInput 
                    onChangeText={text => {
                      const Y = Number(text.split('/', 3)[0]);
                      const M = Number(text.split('/', 3)[1]) - 1;
                      const D = Number(text.split('/', 3)[2]);
                      if(text.split('/', 3)[0] !== '' && text.split('/', 3)[1] !== '' && text.split('/', 3)[2] !== '')
                      setDob(new Date(Y, M, D));
                    }} 
                    placeholder="Unknown">{dob.getFullYear()}/{dob.getMonth() + 1}/{dob.getDate()}
                  </TextInput>
                </View>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dob}
                  mode='date'
                  is24Hour={true}
                  display="default"
                  onChange={handleDobChange}
                />
              )}
            </View>
            <View style={flexOne}>
              <Text>Sex</Text>
              <View style={[flexRow, mtp5]}>
                <View
                  style={[
                    roundedSm,
                    borderPrimary,
                    gender === 'Female' ? bgPrimary : bgWhite
                  ]}
                >
                  <MyButton onPress={() => setGender('Female')} style={styles.switchBtn}>
                    <Image
                      style={[styles.genderImg, resizeContain]}
                      source={gender === 'Female' ? IMAGES_PATH.awesomeFemaleWhite : IMAGES_PATH.awesomeFemalePrimary}
                    />
                  </MyButton>
                </View>
                <View
                  style={[
                    roundedSm,
                    borderPrimary,
                    mlSm,
                    gender === 'Male' ? bgPrimary : bgWhite
                  ]}
                >
                  <MyButton onPress={() => setGender('Male')} style={styles.switchBtn}>
                    <Image
                      style={[styles.genderImg, resizeContain]}
                      source={gender === 'Male' ? IMAGES_PATH.awesomeMaleWhite : IMAGES_PATH.awesomeMalePrimary}
                    />
                  </MyButton>
                </View>
              </View>
            </View>
          </View>

          <View style={[mt1, flexRow]}>
            <View style={flexOne}>
              <Text>Height</Text>
              <View style={[flexRow, mtp5]}>
                <TextInput
                  value={height}
                  onChangeText={ text => setHeight(text) }
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholder="Unknown"
                />
                <Button
                  title="ft"
                  onPress={handleHeightFt}
                  buttonStyle={[
                    roundedSm,
                    mlXs,
                    heightUnit === 'ft' ? bgPrimary : [bgWhite, borderPrimary],
                    styles.switchBtn
                  ]}
                  titleStyle={[
                    heightUnit === 'ft' ? textWhite : primaryColor
                  ]}
                />
                <Button
                  title="cm"
                  onPress={handleHeightCm}
                  buttonStyle={[
                    roundedSm,
                    mlXs,
                    heightUnit === 'cm' ? bgPrimary : [bgWhite, borderPrimary],
                    styles.switchBtn
                  ]}
                  titleStyle={[
                    heightUnit === 'cm' ? textWhite : primaryColor
                  ]}
                />
              </View>
            </View>
            <View style={flexOne}>
              <Text>Weight</Text>
              <View style={[flexRow, mtp5]}>
                <TextInput
                  value={weight}
                  onChangeText={ text => setWeight(text) }
                  style={styles.textInput}
                  keyboardType='numeric'
                  placeholder="Unknown"
                />
                <Button
                  title="kg"
                  onPress={handleWeightKg}
                  buttonStyle={[
                    roundedSm,
                    mlXs,
                    weightUnit === 'kg' ? bgPrimary : [bgWhite, borderPrimary],
                    styles.switchBtn
                  ]}
                  titleStyle={[
                    weightUnit === 'kg' ? textWhite : primaryColor
                  ]}
                />
                <Button
                  title="lb"
                  onPress={handleWeightLb}
                  buttonStyle={[
                    roundedSm,
                    mlXs,
                    weightUnit === 'lb' ? bgPrimary : [bgWhite, borderPrimary],
                    styles.switchBtn
                  ]}
                  titleStyle={[
                    weightUnit === 'lb' ? textWhite : primaryColor
                  ]}
                />
              </View>
            </View>
          </View>

          <View style={[mt1, flexRow]}>
            <View style={flexOne}>
              <Text>Hair</Text>
              <View style={[styles.dropdown, mtp5, w80P]}>
                <Picker
                  selectedValue={hair}
                  onValueChange={(itemValue, itemIndex) =>
                    setHair(itemValue)
                  }
                  style={{height: Size(2.5)}}
                  itemStyle={{maxHeight: Size(2.5), minHeight: Size(2.5), alignItems: 'center'}}
                >
                  <Picker.Item label="Yellow" value="Yellow" />
                  <Picker.Item label="Wave" value="Wave" />
                  <Picker.Item label="Blond" value="Blond" />
                  <Picker.Item label="White" value="White" />
                  <Picker.Item label="Black" value="Black" />
                  <Picker.Item label="Brown" value="Brown" />
                  <Picker.Item label="Gray" value="Gray" />
                </Picker>
              </View>
            </View>
            <View style={flexOne}>
              <Text>Race</Text>
              <View style={[styles.dropdown, mtp5, w80P]}>
                <Picker
                  selectedValue={race}
                  onValueChange={(itemValue, itemIndex) =>
                    setRace(itemValue)
                  }
                  style={{height: Size(2.5)}}
                  itemStyle={{maxHeight: Size(2.5), minHeight: Size(2.5), alignItems: 'center'}}
                >
                  <Picker.Item label="Black" value="Black" />
                  <Picker.Item label="White" value="White" />
                  <Picker.Item label="Hispanic" value="Hispanic" />
                  <Picker.Item label="American" value="American" />
                  <Picker.Item label="Asian" value="Asian" />
                  <Picker.Item label="European" value="European" />
                  <Picker.Item label="Oceanian" value="Oceanian" />
                </Picker>
              </View>
            </View>
          </View>

          <View style={[mt1, flexRow]}>
            <View style={flexOne}>
              <Text>Eyes</Text>
              <View style={[styles.dropdown, mtp5, w80P]}>
                <Picker
                  selectedValue={eye}
                  onValueChange={(itemValue, itemIndex) =>
                    setEye(itemValue)
                  }
                  style={{height: Size(2.5)}}
                  itemStyle={{maxHeight: Size(2.5), minHeight: Size(2.5), alignItems: 'center'}}
                >
                  <Picker.Item label="Yellow" value="Yellow" />
                  <Picker.Item label="Brown" value="Brown" />
                  <Picker.Item label="Blue" value="Blue" />
                  <Picker.Item label="Black" value="Black" />
                  <Picker.Item label="Hazel" value="Hazel" />
                  <Picker.Item label="Green" value="Green" />
                </Picker>
              </View>
            </View>
            <View style={flexOne}>
              <Text>Medical condition</Text>
              <View style={[flexRow, mtp5]}>
                <Button
                  title="Yes"
                  onPress={() => setMedicalCondition(true)}
                  buttonStyle={[
                    roundedSm,
                    medicalCondition ? bgPrimary : [bgWhite, borderPrimary],
                  ]}
                  titleStyle={[
                    medicalCondition ? textWhite : primaryColor
                  ]}
                />
                <Button
                  title="No"
                  onPress={() => setMedicalCondition(false)}
                  buttonStyle={[
                    roundedSm,
                    mlSm,
                    !medicalCondition ? bgPrimary : [bgWhite, borderPrimary],
                  ]}
                  titleStyle={[
                    !medicalCondition ? textWhite : primaryColor
                  ]}
                />
              </View>
            </View>
          </View>

          <View style={[mt1, flexRow]}>
            <View style={flexOne}>
              <Text>Marks</Text>
              <View style={mtp5}>
                <TextInput
                  value={markinfo}
                  onChangeText={ text => setMarkinfo(text) }
                  style={textInput}
                  placeholder="identifying mark info"
                />
              </View>
            </View>
          </View>

          <View style={[mt2, itemsCenter]}>
            {btn_type === 'next'?
              <Button
                title="Next Step(Circumstance)"
                onPress={handleNext}
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

PersonalInfo.propTypes = {
  uploadFile: PropTypes.func,
}

const actions = {
  uploadFile,
  updatePost
}


export default compose(
  connect(null, actions)
)(PersonalInfo);
