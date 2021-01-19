import {
  Colors,
  bgDivider,
  bgTransparent,
  bgWhite,
  flexRow,
  fontWeightBold,
  justifyBetween,
  marginVerticalAuto,
  ml1,
  mt1,
  mtp5,
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

const MissingDetailInfo = ({
  style,
  missingContent,
  onPress,
  missingCollpase,
  fromDetail
}) => {
  
  return (
    <View style={style}>
      <Text style={[fromDetail ? textWhite : primaryColor, fontWeightBold]}>Missing From: {missingContent.duo_location}</Text>
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
            <Text style={fromDetail ? textWhite : undefined}>{missingContent.height_cm ? missingContent.height_cm + ' cm' : missingContent.height_ft + ' ft'}</Text>
          </View>
          <View style={ml1}>
            <Text style={[fromDetail ? textWhite : textYellow100, fontWeightBold]}>Weight</Text>
            <Text style={fromDetail ? textWhite : undefined}>{missingContent.weight_kg ? missingContent.weight_kg + ' kg' : missingContent.weight_lb + ' lb'}</Text>
          </View>
        </View>
        <Button
          onPress={onPress}
          buttonStyle={[bgTransparent, marginVerticalAuto]}
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
              <Text style={fromDetail ? textWhite : undefined}>{missingContent.language}</Text>
            </View>
          </View>
          <Divider style={[fromDetail ? bgWhite : bgDivider, styles.divider]} />
          <View>
            <Text style={[textXl, fromDetail ? textWhite : primaryColor]}>Circumstances</Text>
            <View style={mtp5}>
              <Text style={fromDetail ? textWhite : undefined}>{missingContent.circumstance}</Text>
            </View>
          </View>
          <Divider style={[fromDetail ? bgWhite : bgDivider, styles.divider]} />
          <View style={[flexRow, justifyBetween]}>
            <View>
              <Text style={[textXl, fromDetail ? textWhite : primaryColor]}>Contact</Text>
              <Text style={fromDetail ? textWhite : undefined}>If you have any information about{"\n"}the whomabout of {missingContent.fullname}</Text>
            </View>
            <View style={flexRow}>
              <View>
                <Image style={[styles.contactImg, selfCenter]} source={IMAGES_PATH.phoneCall} />
                <View style={mtp5}>
                  <Text>Call</Text>
                </View>
              </View>
              <View style={ml1}>
                <Image style={[styles.contactImg, selfCenter]} source={IMAGES_PATH.openChat} />
                <View style={mtp5}>
                  <Text>Message</Text>
                </View>
              </View>
            </View>
          </View>
        </> 
      }
    </View>  
  )
};

export default MissingDetailInfo;
