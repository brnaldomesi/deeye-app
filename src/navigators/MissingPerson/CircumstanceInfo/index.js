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

import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';
import Header from '../components/Header';
import { IMAGES_PATH } from 'src/config/constants';
import MyButton from 'src/components/MyButton';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { flexOne } from 'src/styles';
import moment from 'moment';
import styles from './styles';
import { uploadFile } from 'src/redux/modules/posts';

const CircumstanceInfo = ({
  route, 
  navigation,
  uploadFile
}) => {
  const [missingSince, setMissingSince] = useState(new Date(1598051730000));
  const [duoLocation, setDuoLocation] = useState('');
  const [showMissingSince, setShowMissingSince] = useState(false);
  const [circumstance, setCircumstance] = useState('');
  const [hasTattoo, setHasTattoo] = useState(true);
  const [language, setLanguage] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const { formData } = route.params;

  const handleNext = () => {
    formData.missing_post.missing_since = moment(missingSince).format("YYYY-MM-DD hh:mm:ss");
    formData.missing_post.circumstance = circumstance;
    formData.missing_post.has_tattoo = hasTattoo;
    formData.missing_post.language = language;
    formData.missing_post.company_name = companyName;
    formData.missing_post.duo_location = duoLocation;

    navigation.navigate('ContactInfo', {formData});
  }

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
  
  const handleMissingSince = () => {
    setShowMissingSince(true)
  }

  const handleMissingSinceChange = (event, selectedDate) => {
    const currentDate = selectedDate || missingSince;
    setShowMissingSince(Platform.OS === 'ios');
    setMissingSince(currentDate);
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

  return (
    <View style={flexOne}>
      <Header title="Circumstance Information" step={2} />
      <ScrollView>
        <View style={p1}>
          <Text>Missing From</Text>
          <Text style={[textDot7, italic]}>Where the person went missing</Text>
          <View style={mtp5}>
            <TextInput 
              style={textInput} 
              placeholder="Location"
              value={duoLocation}
              onChangeText = { text => setDuoLocation(text) }
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
                <Text>{missingSince.getFullYear()}/{missingSince.getMonth() + 1}/{missingSince.getDate()}</Text>
              </View>
            </View>
            {showMissingSince && (
              <DateTimePicker
                testID="dateTimePicker"
                value={missingSince}
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
                maxLength={100}
                onChangeText={text => setCircumstance(text)}
                value={circumstance}
              />
              <Text style={[absolute, italic, styles.limitText]}>100</Text>
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
            <Button 
              title="Next Step(Contact Information)"
              onPress={handleNext}
              buttonStyle={[bgPrimary, roundedSm, px2]}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
};

CircumstanceInfo.propTypes = {
  uploadFile: PropTypes.func,
}

const actions = {
  uploadFile,
}

export default compose(
  connect(null, actions)
)(CircumstanceInfo);
