import {
  Colors,
  bgDivider,
  bgTransparent,
  bgWhite,
  flexRow,
  fontWeightBold,
  justifyBetween,
  ml1,
  mt1,
  mt2,
  mtp5,
  textDot7,
  myAuto,
  primaryColor,
  selfCenter,
  textWhite,
  textXl,
  textYellow100
} from 'src/styles';
import {
  Image,
  Text,
  View
} from 'react-native';

import AntIcon from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import { IMAGES_PATH } from 'src/config/constants';
import React from 'react';
import moment from 'moment';
import styles from './styles';
import { TouchableOpacity } from 'react-native';

const MissingDetailInfo = ({
  style,
  missingContent,
  onPress,
  missingCollpase,
  fromDetail
}) => {

  const handlePoliceCall = () => {

  }

  const handlePersonCall = () => {

  }

  const handlePersonSms = () => {

  }

  return (
    <View style={style}>
      <Text style={[fromDetail ? textWhite : primaryColor, fontWeightBold]}>Missing From: {missingContent.duo_location? missingContent.duo_location : ' - '}</Text>
      <Text style={[fromDetail ? textWhite : primaryColor, fontWeightBold]}>Missing Since: {moment(missingContent.missing_since).format("dddd, MMMM D, YYYY")}</Text>
      <View style={[flexRow, justifyBetween, mt1]}>
        <View style={flexRow}>
          <View>
            <Text style={[fromDetail ? textWhite : textYellow100, fontWeightBold]}>Sex</Text>
            <Text style={fromDetail ? textWhite : undefined}>{missingContent.sex}</Text>
          </View>
          <View style={ml1}>
            <Text style={[fromDetail ? textWhite : textYellow100, fontWeightBold]}>Age</Text>
            <Text style={fromDetail ? textWhite : undefined}>{isNaN(moment().year() - moment(missingContent.dob).year()) ? '' : moment().year() - moment(missingContent.dob).year()} Yrs</Text>
          </View>
          <View style={ml1}>
            <Text style={[fromDetail ? textWhite : textYellow100, fontWeightBold]}>Race</Text>
            <Text style={fromDetail ? textWhite : undefined}>{missingContent.race}</Text>
          </View>
          <View style={ml1}>
            <Text style={[fromDetail ? textWhite : textYellow100, fontWeightBold]}>Height</Text>
            <Text style={fromDetail ? textWhite : undefined}>{!missingContent.height_cm ? ' - ' : missingContent.height_ft + ' cm'}</Text>
          </View>
          <View style={ml1}>
            <Text style={[fromDetail ? textWhite : textYellow100, fontWeightBold]}>Weight</Text>
            <Text style={fromDetail ? textWhite : undefined}>{!missingContent.weight_kg ? '- ' : missingContent.weight_lb + ' kg'}</Text>
          </View>
        </View>
        <Button
          onPress={onPress}
          buttonStyle={[bgTransparent, myAuto]}
          icon={<AntIcon name={missingCollpase ? "downcircleo" : "upcircleo"} color={fromDetail ? 'white' : Colors.yellow100} size={25} />}
        />
      </View>
      {!missingCollpase &&
        <>
          <View style={flexRow}>
            <View>
              <Text style={[fromDetail ? textWhite : textYellow100, fontWeightBold]}>Eye</Text>
              <Text style={fromDetail ? textWhite : undefined}>{missingContent.eye}</Text>
            </View>
            <View style={ml1}>
              <Text style={[fromDetail ? textWhite : textYellow100, fontWeightBold]}>Hair</Text>
              <Text style={fromDetail ? textWhite : undefined}>{missingContent.hair}</Text>
            </View>
            <View style={ml1}>
              <Text style={[fromDetail ? textWhite : textYellow100, fontWeightBold]}>Tattoo</Text>
              <Text style={fromDetail ? textWhite : undefined}>{missingContent.has_tattoo ? "Yes" : "No"}</Text>
            </View>
            <View style={ml1}>
              <Text style={[fromDetail ? textWhite : textYellow100, fontWeightBold]}>Language</Text>
              <Text style={fromDetail ? textWhite : undefined}>{missingContent.language? missingContent.language : ' - '}</Text>
            </View>
          </View>
          <Divider style={[fromDetail ? bgWhite : bgDivider, styles.divider]} />
          <View>
            <Text style={[textXl, fromDetail ? textWhite : primaryColor]}>Circumstances</Text>
            <View style={mtp5}>
              <Text style={fromDetail ? textWhite : undefined}>{missingContent.circumstance? missingContent.circumstance : ' - '}</Text>
            </View>
          </View>
          <Divider style={[fromDetail ? bgWhite : bgDivider, styles.divider]} />
          <View style={[flexRow, justifyBetween]}>
            <View>
              <Text style={[textXl, fromDetail ? textWhite : primaryColor]}>Contact</Text>
              <View style={mt2, flexRow}>
                <View>
                  <Text>Police Contact</Text>
                  <Text>{missingContent.contact_phone_number1? missingContent.contact_phone_number1 : ' - '}</Text>
                </View>
                <TouchableOpacity onPress={handlePoliceCall}>
                  <Image style={[styles.contactImg, styles.police_call]} source={IMAGES_PATH.phoneCall} />
                </TouchableOpacity>
              </View>
              <View style={flexRow}>
                <View>
                  <Text>Personal Contact</Text>
                  <Text>{missingContent.contact_phone_number2? missingContent.contact_phone_number2 : ' - '}</Text>
                </View>
                <TouchableOpacity onPress={handlePersonCall}>
                  <Image style={[styles.contactImg, styles.person_call]} source={IMAGES_PATH.phoneCall}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePersonSms}>
                  <Image style={[styles.contactImg, styles.person_sms]} source={IMAGES_PATH.openChat} />  
                </TouchableOpacity>
              </View>
              <Text style={[fromDetail ? textWhite : undefined, textDot7]}>If you have any information about{"\n"}the whomabout of {missingContent.fullname}</Text>
            </View>
          </View>
        </> 
      }
    </View>  
  )
};

export default MissingDetailInfo;
