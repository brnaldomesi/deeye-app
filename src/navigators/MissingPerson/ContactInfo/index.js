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
  py1,
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
import React, { useState } from 'react';
import { createPost, uploadFile } from 'src/redux/modules/posts';

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
  createPost,
  uploadFile
}) => {
  const [contactPhoneNumber1, setContactPhoneNumber1] = useState('');
  const [contactPhoneNumber2, setContactPhoneNumber2] = useState('');
  const [phoneNumber1Type, setPhoneNumber1Type] = useState(false);
  const [phoneNumber2Type, setPhoneNumber2Type] = useState(false);
  const [haveRerpot, setHaveRerpot] = useState(true);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [attachments, setAttachments] = useState([]);

  const { formData } = route.params;

  const handleSubmit = () => {
    formData.missing_post.contact_phone_number1 = contactPhoneNumber1;
    formData.missing_post.contact_phone_number2 = contactPhoneNumber2;
    if(attachments[0]) {
      formData.missing_post.verification_report_path = attachments[0].uri;
    }
    formData.missing_post.missing_type = "Missing_person";
    formData.missing_post.badge_awarded = "Pending";

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
              checked={phoneNumber1Type}
              onPress={() => setPhoneNumber1Type(true)}
              containerStyle={{ backgroundColor: 'transparent'}}
              checkedColor={Colors.primary}
            />
            <CheckBox
              title='Personal'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!phoneNumber1Type}
              onPress={() => setPhoneNumber1Type(false)}
              containerStyle={{backgroundColor: 'transparent'}}
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
              checked={phoneNumber2Type}
              onPress={() => setPhoneNumber2Type(true)}
              containerStyle={{ backgroundColor: 'transparent'}}
              checkedColor={Colors.primary}
            />
            <CheckBox
              title='Personal'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!phoneNumber2Type}
              onPress={() => setPhoneNumber2Type(false)}
              containerStyle={{backgroundColor: 'transparent'}}
              checkedColor={Colors.primary}
            />
          </View>

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
  createPost: PropTypes.func,
  uploadFile: PropTypes.func
}

const actions = {
  createPost,
  uploadFile
}


export default compose(
  connect(null, actions)
)(ContactInfo);
