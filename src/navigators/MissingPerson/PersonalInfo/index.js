import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import React, { useState } from 'react';
import {
  Size,
  absolute,
  bgPrimary,
  bgWhite,
  borderPrimary,
  flexCol,
  flexOne,
  itemsCenter,
  itemsStart,
  justifyCenter,
  ml1,
  mlSm,
  mt1,
  mt2,
  mtp5,
  p1,
  primaryColor,
  px2,
  pxDot7,
  pyXs,
  relative,
  resizeContain,
  roundedSm,
  textInput,
  textWhite,
  w80P
} from 'src/styles';

import { Button } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import Header from '../components/Header';
import { IMAGES_PATH } from 'src/config/constants';
import MyButton from 'src/components/MyButton';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import styles from './styles';
import { uploadFile } from 'src/redux/modules/posts';

const PersonalInfo = ({navigation, uploadFile}) => {
  const [fullname, setFullname] = useState('');
  const [aka, setAka] = useState('');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [heightUnit, setHeightUnit] = useState('ft');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [hair, setHair] = useState('');
  const [race, setRace] = useState('');
  const [eye, setEye] = useState('');
  const [selectedFileNames, setSelectedFileNames] = useState('');
  const [medicalCondition, setMedicalCondition] = useState(true);
  const [dob, setDob] = useState(new Date(1598051730000));
  const [showDatePicker, setShowDatePicer] = useState(false);
  const [attachments, setAttachments] = useState([]);
  
  const handleNext = () => {
    const formData = {}
    formData.missing_post = {};
    formData.missing_post.fullname = fullname;
    formData.missing_post.aka = aka;
    formData.missing_post.sex = gender;
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
    formData.description = "Missing Person post sample";
    navigation.navigate('CircumstanceInfo',{formData})
  };

  const handleUpload = (data) => {
    const formData = new FormData();
    formData.append('file', data);
    formData.append('file_type', 'Image');
    uploadFile({
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      success: res => {
        setAttachments(attachments => attachments.concat([{
          id: res.id, 
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
    if(heightUnit === 'ft' & height !== null) {
      setHeight((height * 30.48).toFixed(0))
    }
    setHeightUnit('cm')
  }

  const handleHeightFt = () => {
    if(heightUnit === 'cm' & height !== null) {
      setHeight((height / 30.48).toFixed(1))
    }
    setHeightUnit('ft')
  }

  const handleWeightKg = () => {
    if(weightUnit === 'lb' & weight !== null) {
      setWeight((weight * 35.274).toFixed(0))
    }
    setWeightUnit('kg')
  }

  const handleWeightLb = () => {
    if(weightUnit === 'kg' & weight !== null) {
      setWeight((weight / 35.274).toFixed(1))
    }
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

          <View style={[mt1, flexCol]}>
            <View style={flexOne}>
              <Text>Age (Date of Birthday)</Text>
              <View style={flexCol}>
                <MyButton onPress={handleDob} style={[mtp5, itemsStart]}>
                  <Image 
                    style={[styles.square, resizeContain]}
                    source={IMAGES_PATH.featherCalendar}
                  />
                </MyButton>
                <View style={[justifyCenter, ml1]}>
                  <Text>{dob.getFullYear()}/{dob.getMonth() + 1}/{dob.getDate()}</Text>
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
              <View style={[flexCol, mtp5]}>
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

          <View style={[mt1, flexCol]}>
            <View style={flexOne}>
              <Text>Height</Text>
              <View style={[flexCol, mtp5]}>
                <TextInput 
                  value={height} 
                  onChangeText={ text => setHeight(text) } 
                  style={textInput}
                  keyboardType='numeric' 
                />
                <Button 
                  title="ft" 
                  onPress={handleHeightFt}
                  buttonStyle={[
                    roundedSm,
                    ml1,
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
                    mlSm,
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
              <View style={[flexCol, mtp5]}>
                <TextInput 
                  value={weight} 
                  onChangeText={ text => setWeight(text) } 
                  style={textInput}
                  keyboardType='numeric' 
                />
                <Button 
                  title="kg" 
                  onPress={handleWeightKg}
                  buttonStyle={[
                    roundedSm,
                    ml1,
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
                    mlSm,
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

          <View style={[mt1, flexCol]}>
            <View style={flexOne}>
              <Text>Hair</Text>
              <TextInput 
                value={hair}
                onChangeText={ text => setHair(text) }
                style={[
                  textInput, 
                  mtp5,
                  w80P
                ]}
                placeholder="color of the hair"
              />
            </View>
            <View style={flexOne}>
              <Text>Race</Text>
              <TextInput 
                value={race}
                onChangeText={ text => setRace(text) }
                style={[
                  textInput, 
                  mtp5,
                  w80P
                ]}
                placeholder="race of being"
              />
            </View> 
          </View>

          <View style={[mt1, flexCol]}>
            <View style={flexOne}>
              <Text>Eyes</Text>
              <TextInput 
                value={eye}
                onChangeText={ text => setEye(text) }
                style={[
                  textInput, 
                  mtp5,
                  w80P
                ]}
                placeholder="color of the eye"
              />
            </View>
            <View style={flexOne}>
              <Text>Medical condition</Text>
              <View style={[flexCol, mtp5]}>
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

          <View style={[mt2, itemsCenter]}>
            <Button 
              title="Next Step(Circumstance)"
              onPress={handleNext}
              buttonStyle={[bgPrimary, roundedSm, px2]}
            />
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
}

// const selector = createStructuredSelector({
// });

export default compose(
  connect(null, actions)
)(PersonalInfo);
