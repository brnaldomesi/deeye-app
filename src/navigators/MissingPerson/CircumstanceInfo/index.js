import {
  Image,
  Platform,
  Text,
  TextInput,
  View
} from 'react-native';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  absolute,
  bgPrimary,
  bgWhite,
  borderPrimary,
  borderRed,
  flexRow,
  fontWeightBold,
  italic,
  itemsCenter,
  justifyCenter,
  ml1,
  mlSm,
  mt1,
  mt2,
  mtp5,
  p1,
  pDot7,
  primaryColor,
  px2,
  pyXs,
  relative,
  resizeContain,
  rounded1,
  roundedSm,
  textCenter,
  textDot7,
  textInput,
  textInputRed,
  textRed,
  textWhite,
  w80P
} from 'src/styles';
import {updatePost} from 'src/redux/modules/posts';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Header from '../components/Header';
import { IMAGES_PATH } from 'src/config/constants';
import MyButton from 'src/components/MyButton';
import PropTypes from 'prop-types';
import VirtualizedView from 'src/components/VirtualizedView';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { flexOne } from 'src/styles';
import moment from 'moment';
import styles from './styles';
import { uploadFile } from 'src/redux/modules/posts';

const CircumstanceInfo = ({
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
  const post_id = !route.params.post_type? formData.missing_post.id : '';
  const i_circumstance = !route.params.post_type? formData.missing_post.circumstance : '';
  const i_phone1 = !route.params.post_type? formData.missing_post.contact_phone_number1 : '';
  const i_phone2 = !route.params.post_type? formData.missing_post.contact_phone_number2 : '';
  const i_aka = !route.params.post_type? formData.missing_post.aka : '';
  const i_mark = !route.params.post_type? formData.missing_post.mark: '';
  const i_dob = !route.params.missingType? moment(formData.missing_post.dob, "YYYY-MM-DD"): moment('2020-1-1', "YYYY-MM-DD");
  const i_medicalCondition = !route.params.post_type? formData.missing_post.medicalCondition: '';
  const i_tatoo = !route.params.post_type? formData.missing_post.tatoo: '';
  const i_language = !route.params.post_type? formData.missing_post.language: '';
  const i_contactAgencyName = !route.params.post_type? formData.missing_post.contactAgencyName: '';
  const i_caseUpload = !route.params.post_type? formData.missing_post.caseUpload: '';
  const i_duoLocation = !route.params.post_type && formData.missing_post.duoLocation !== 'null' ? formData.missing_post.duoLocation: '';
  const i_missing_since = route.params.post_type !== undefined ? moment('2020-1-1', "YYYY-MM-DD") : moment(formData.missing_post.missingSince, "YYYY-MM-DD");
  const Location = i_duoLocation !== null ? i_duoLocation : '';
  const [aka, setAka] = useState(i_aka);
  const [markinfo, setMarkinfo] = useState(i_mark);
  const [dob, setDob] = useState(i_dob);
  const [medicalCondition, setMedicalCondition] = useState(i_medicalCondition);
  const [language, setLanguage] = useState(i_language);
  const [contactAgencyName, setContactAgencyName] = useState(i_contactAgencyName);
  const [caseUpload, setCaseUpload] = useState(i_caseUpload);
  const [gender, setGender] = useState(i_gender);
  const [height, setHeight] = useState(i_height);
  const [weight, setWeight] = useState(i_weight);
  const [fullname, setFullname] = useState(i_fullname);
  const [hair, setHair] = useState(i_hair);
  const [race, setRace] = useState(i_race);
  const [eye, setEye] = useState(i_eye);
  const [circumstance, setCircumstance] = useState(i_circumstance);
  const [number1, setNumber1] = useState(i_phone1);
  const [number2, setNumber2] = useState(i_phone2);
  const [duoLocation, setDuoLocation] = useState(i_duoLocation);
  const [missingSince, setMissingSince] = useState(i_missing_since);
  const [showMissingSince, setShowMissingSince] = useState(false);
  const [hasTattoo, setHasTattoo] = useState(i_tatoo);
  const [companyName, setCompanyName] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText(Location);
    setDuoLocation(i_duoLocation);
  }, [])
  const handleNext = useCallback(() => {
    formData.missing_post.missing_since = moment(missingSince).format("YYYY-MM-DD hh:mm:ss");
    formData.missing_post.circumstance = circumstance;
    formData.missing_post.has_tattoo = hasTattoo;
    formData.missing_post.language = language;
    formData.missing_post.company_name = companyName;
    formData.missing_post.duo_location = duoLocation;
    formData.missing_post.missing_location_latitude = lat;
    formData.missing_post.missing_location_longitude = lng;
    navigation.navigate('ContactInfo', formData);
  }, [
    lat,
    lng,
    duoLocation,
    formData,
    missingSince,
    circumstance,
    hasTattoo,
    language,
    companyName,
    navigation
  ])

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
        tatoo: hasTattoo,
        language: language,
        contactAgencyName: contactAgencyName,
        caseUpload: caseUpload,
        duoLocation: duoLocation,
        missingSince: moment(missingSince).format("YYYY-MM-DD hh:mm:ss")
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
          attachment_type: 'General'
        }]));
      },
      fail: err => {
        console.error(err)
      }
    });
  }

  const handleMissingSince = () => {
    setShowMissingSince(true)
  }

  const handleMissingSinceChange = (event, selectedDate) => {
    const currentDate = selectedDate || missingSince;
    setShowMissingSince(Platform.OS === 'ios');
    setMissingSince(moment(currentDate, "YYYY-MM-DD"));
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

  const handlePlacePick = (data, details) => {
    setDuoLocation(data.description);
    setLat(details.geometry.location.lat);
    setLng(details.geometry.location.lng);
  };

  return (
    <View style={flexOne}>
      <Header title="Circumstance Information" step={2} />
      <VirtualizedView>
        <View style={p1}>
          <Text>Missing From</Text>
          <Text style={[textDot7, italic]}>Where the person went missing</Text>
          <View style={mtp5}>
            <GooglePlacesAutocomplete
              ref={ref}
              onPress={handlePlacePick}
              fetchDetails={true}
              query={{
                key: 'AIzaSyDXaEl76iuHpKDwozfyPsyVeObazX4ldyw',
                language: 'en',
              }}
              onFail={err => console.error(err)}
              // enableHighAccuracyLocation={true}
              enablePoweredByContainer={false}
              styles={{
                textInputContainer: textInput,
                textInput: styles.missingFromInput
              }}
            />
          </View>
          <View style={mt1}>
            <Text>Missing Since</Text>
            <Text style={[textDot7, italic]}>When the person went missing from</Text>
            <View style={flexRow}>
              <MyButton onPress={handleMissingSince} style={[mtp5]}>
                <Image
                  style={[styles.square, resizeContain]}
                  source={IMAGES_PATH.featherCalendar}
                />
              </MyButton>
              <View style={[justifyCenter, ml1]}>
                {<TextInput
                  onChangeText={text => {
                    const Y = Number(text.split('/', 3)[0]);
                    const M = Number(text.split('/', 3)[1]);
                    const D = Number(text.split('/', 3)[2]);
                    const date = Y + '-' + M + '-' + D;
                    if(Number(text.split('/', 3)[0]) > 2000 && Number(text.split('/', 3)[1]) > 0 && Number(text.split('/', 3)[1]) < 13 && Number(text.split('/', 3)[2]) > 0 && Number(text.split('/', 3)[2]) < 32 && text.split('/', 3).length == 3)
                    setMissingSince(moment(date, "YYYY-MM-DD"));
                  }}
                  placeholder="Unknown">{missingSince.year() + '/' + Number(missingSince.month() + 1).toString() + '/' + missingSince.date()}
                </TextInput>}
              </View>
            </View>
            {showMissingSince && (
              <DateTimePicker
                testID="dateTimePicker"
                value={missingSince.toDate()}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={handleMissingSinceChange}
              />
            )}
          </View>

          <View style={mt1}>
            <Text>Circumstance</Text>
            <Text style={[textDot7, italic]}>Description of disappears</Text>
            <View
              style={[
                rounded1,
                borderPrimary,
                mtp5,
                relative,
                styles.circumstance
              ]}
            >
              <TextInput
                multiline
                // maxLength={100}
                onChangeText={text => setCircumstance(text)}
                value={circumstance}
              />
              {/* <Text style={[absolute, italic, styles.limitText]}>100</Text> */}
            </View>
            <Text style={[textDot7, italic]}>Important information such as medical condition and tatto etc will be great help in the search</Text>
          </View>

          <View style={[mt1, flexRow]}>
            <View style={flexOne}>
              <Text>Tattoo</Text>
              <View style={[flexRow, mtp5]}>
                <Button
                  title="Yes"
                  onPress={() => setHasTattoo(true)}
                  buttonStyle={[
                    roundedSm,
                    hasTattoo ? bgPrimary : [bgWhite, borderPrimary],
                  ]}
                  titleStyle={[
                    hasTattoo ? textWhite : primaryColor
                  ]}
                />
                <Button
                  title="No"
                  onPress={() => setHasTattoo(false)}
                  buttonStyle={[
                    roundedSm,
                    mlSm,
                    !hasTattoo ? bgPrimary : [bgWhite, borderPrimary],
                  ]}
                  titleStyle={[
                    !hasTattoo ? textWhite : primaryColor
                  ]}
                />
              </View>
            </View>
            <View style={flexOne}>
              <Text>Language</Text>
              <TextInput
                style={[textInput, mtp5]}
                value={language}
                onChangeText={text => setLanguage(text)}
                placeholder="English, Spanish etc"
              />
            </View>
          </View>

          <View
            style={[
              roundedSm,
              borderRed,
              mt2,
              itemsCenter,
              pDot7
            ]}
          >
            <Text style={[textRed, fontWeightBold]}>In the company of who?</Text>
            <TextInput
              style={[textCenter, textInputRed, mtp5, w80P]}
              value={companyName}
              onChangeText={text => setCompanyName(text)}
              placeholder="Name of person"
            />
            <View style={pyXs}>
              <Text>{selectedFileName}</Text>
            </View>
            <MyButton onPress={handleUploadPick}>
              <Image
                style={[styles.square, resizeContain]}
                source={IMAGES_PATH.fileUploadRed}
              />
            </MyButton>
            <Text style={[mtp5, textRed]}>Upload Photo</Text>
          </View>
          <View style={[mt1, itemsCenter]}>
            {btn_type === 'next'?
              <Button
                title="Next Step(Contact Information)"
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
      </VirtualizedView>
    </View>
  )
};

CircumstanceInfo.propTypes = {
  uploadFile: PropTypes.func,
}

const actions = {
  uploadFile,
  updatePost
}

export default compose(
  connect(null, actions)
)(CircumstanceInfo);
