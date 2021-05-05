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

const ContactInfo = ({
  route,
  navigation,
  uploadFile
}) => {
  const [contactPhoneNumber1, setContactPhoneNumber1] = useState('');
  const [contactPhoneNumber2, setContactPhoneNumber2] = useState('');
  const [contactAgencyName, setContactAgencyName] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [phoneNumber1Type, setPhoneNumber1Type] = useState({'police': true, 'fbi': false, 'detective': false});
  const [phoneNumber2Type, setPhoneNumber2Type] = useState({'police': true, 'fbi': false, 'detective': false});
  const [caseUpload, setCaseUpload] = useState('');
  const [haveRerpot, setHaveRerpot] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [attachments, setAttachments] = useState([]);

  const { formData } = route.params;

  const handleSubmit = () => {
    formData.missing_post.contact_phone_number1 = contactPhoneNumber1;
    formData.missing_post.contact_phone_number2 = contactPhoneNumber2;
    formData.missing_post.contactAgencyName = contactAgencyName;
    formData.missing_post.caseUpload = caseUpload;
    
    if(attachments[0]) {
      formData.missing_post.verification_report_path = attachments[0].uri;
    }
    formData.missing_post.badge_awarded = "Pending";

    navigation.navigate('Review', {formData});
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
            <Button
              title="Finish for review"
              onPress={handleSubmit}
              buttonStyle={[bgPrimary, roundedSm, px2]}
            />
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
  uploadFile
};

export default compose(
  connect(null, actions)
)(ContactInfo);
