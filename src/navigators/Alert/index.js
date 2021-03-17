import {
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import React from 'react';
import styles from './styles';
import * as gStyle from 'src/styles'
import {IMAGES_PATH} from "../../config/constants";

const Alert = () => {

  return (
    <View style={[styles.container, gStyle.bgWhite]}>
      <ScrollView style={styles.scroll_view}>
        <View style={styles.simple_item}>
          <View style={styles.leftImg}>
            <View style={[styles.vwImg, styles.alert_color_green]}>
              <Image style={styles.circleImg} source={IMAGES_PATH.avatar} />
            </View>
            <Image style={styles.badgeImg} source={IMAGES_PATH.alert_request} />
          </View>
          <View style={styles.contentText}>
            <Text style={styles.text_content}><Text style={styles.name_primary}>Roy Adams</Text>{' '}supports your post</Text>
          </View>
          <View style={styles.timeText}>
            <View style={styles.rightImg}>
              <TouchableOpacity style={styles.settingTouch}>
                <Text style={styles.settingText}>Accept</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.text_min}>15min</Text>
            </View>
          </View>
        </View>
        <View style={styles.simple_item}>
          <View style={styles.leftImg}>
            <View style={[styles.vwImg, styles.alert_color_red]}>
              <Image style={styles.circleImg} source={IMAGES_PATH.avatar} />
            </View>
            <Image style={styles.badgeImg} source={IMAGES_PATH.alert_support} />
          </View>
          <View style={styles.contentText}>
            <Text style={styles.text_content}><Text style={styles.name_primary}>Roy Adams</Text>{' '}supports your post supports your post</Text>
          </View>
          <View style={styles.timeText}>
            <View style={styles.rightImg}>
              <Image style={styles.settingImg} source={IMAGES_PATH.setting} />
            </View>
            <View style={styles.d_flex}>
              <Text style={styles.text_min}>15min</Text>
            </View>
          </View>
        </View>
        <View style={styles.large_item}>
          <View style={styles.large_top_item}>
            <View style={styles.large_leftImg}>
              <View style={styles.m_auto}>
                <View style={[styles.large_vwImg, styles.alert_color_large_default]}>
                  <Image style={styles.circleImg} source={IMAGES_PATH.avatar} />
                </View>
                <Image style={styles.large_badgeImg} source={IMAGES_PATH.alert_verify} />
              </View>
              <View style={[styles.large_badgeBtn]}>
                <Button
                  title={'Verifed'}
                  titleStyle={styles.text_white}
                  buttonStyle={styles.large_badgeBtn_small}
                />
              </View>
            </View>
            <View style={styles.large_contentText}>
              <Text style={[styles.large_text_top_content, styles.text_missing_color]}>Missing Person Alert</Text>
              <Text style={styles.large_text_bottom_content}>Adam Sullivan</Text>
              <Text style={styles.large_text_content}>Missing Since: Tue. 21 December, 2020</Text>
              <Text style={styles.large_text_content}>Missing From: Lisbon</Text>
              <View>
                <Text style={styles.large_text_verifed}>Your post has been Verifed</Text>
              </View>
              {/*<View style={styles.d_flex}>*/}
              {/*  <Text style={styles.large_text_account_first}>Posted by </Text>*/}
              {/*  <View style={[styles.verifed_img]}>*/}
              {/*    <Image style={styles.circleImg} source={IMAGES_PATH.avatar} />*/}
              {/*  </View>*/}
              {/*  <Text style={styles.large_text_account_last}>{' '}@Laurel_Lawson</Text>*/}
              {/*</View>*/}
            </View>
            <View style={styles.timeText}>
              <View style={styles.rightImg}>
                <Image style={styles.large_settingImg} source={IMAGES_PATH.setting} />
              </View>
              <View style={styles.d_flex}>
                <Text style={styles.text_min}>15min</Text>
              </View>
            </View>
          </View>
          <View style={styles.large_bottom_item}>
            <View style={styles.large_leftImg}>
              <Image style={styles.uploadImg} source={IMAGES_PATH.bx_upload} />
            </View>
            <View style={styles.large_bottom_contentText}>
              <Text style={styles.uploadText}>
                Boost Your Missing Person Post for more reach
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.large_item}>
          <View style={styles.large_top_item}>
            <View style={styles.large_leftImg}>
              <View style={styles.m_auto}>
                <View style={[styles.large_vwImg, styles.alert_color_large_default]}>
                  <Image style={styles.circleImg} source={IMAGES_PATH.avatar} />
                </View>
                <Image style={styles.large_badgeImg} source={IMAGES_PATH.alert_verify} />
              </View>
              <View style={[styles.large_badgeBtn]}>
                <Button
                  title={'Verifed'}
                  titleStyle={styles.text_white}
                  buttonStyle={styles.large_badgeBtn_small}
                />
              </View>
            </View>
            <View style={styles.large_contentText}>
              <Text style={[styles.large_text_top_content, styles.text_found_color]}>Missing Person Alert</Text>
              <Text style={styles.large_text_bottom_content}>Adam Sullivan</Text>
              <Text style={styles.large_text_content}>Missing Since: Tue. 21 December, 2020</Text>
              <Text style={styles.large_text_content}>Missing From: Lisbon</Text>
              <View style={styles.d_flex}>
                <Text style={styles.large_text_account_first}>Posted by </Text>
                <View style={[styles.verifed_img]}>
                  <Image style={styles.circleImg} source={IMAGES_PATH.avatar} />
                </View>
                <Text style={styles.large_text_account_last}>{' '}@Laurel_Lawson</Text>
              </View>
            </View>
            <View style={styles.timeText}>
              <View style={styles.rightImg}>
                <Image style={styles.large_settingImg} source={IMAGES_PATH.setting} />
              </View>
              <View style={styles.d_flex}>
                <Text style={styles.text_min}>15min</Text>
              </View>
            </View>
          </View>
          <View style={styles.d_flex}>
            <View style={[styles.d_flex, styles.m_auto]}>
              <Text style={[styles.m_auto, styles.large_text_top_content, styles.text_found_color]}>Thanks to Community Member</Text>
            </View>
          </View>
          <View style={[styles.d_flex]}>
            <View style={[styles.m_auto, gStyle.wFull]}>
              <View style={[styles.share_content, styles.d_flex]}>
                <View style={[styles.m_auto, styles.d_flex]}>
                  <View style={[styles.share_vwImg, styles.alert_color_white]}>
                    <Image style={styles.shareImg} source={IMAGES_PATH.avatar} />
                  </View>
                  <View style={[styles.share_vwImg, styles.alert_color_white]}>
                    <Image style={styles.shareImg} source={IMAGES_PATH.avatar} />
                  </View>
                  <View style={[styles.share_vwImg, styles.alert_color_white]}>
                    <Image style={styles.shareImg} source={IMAGES_PATH.avatar} />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.large_bottom_item}>
            <View style={styles.large_bottom_verify_contentText}>
              <Image style={styles.bottom_uploadImg} source={IMAGES_PATH.bx_share} />
              <Text style={styles.bottom_uploadText}>
                {'   '}Share the good news
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Alert;
