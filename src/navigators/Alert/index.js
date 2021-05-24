import {
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  View
} from 'react-native';
import {Button} from 'react-native-elements';
import React, {useEffect} from 'react';
import styles from './styles';
import * as gStyle from 'src/styles'
import {IMAGES_PATH} from "../../config/constants";
import {compose} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import PropTypes from "prop-types";

import {
  getAlertList,
  alertsListSelector,
  emptyBadgeCount
} from 'src/redux/modules/alert';
import {ASSET_BASE_URL} from "../../config/apipath";
import {getDiffFromToday} from "../../utils/helpers";
import moment from 'moment';
import {getFollowList, setFollow} from '../../redux/modules/follow';

const Alert = ({getAlertList, alerts, emptyBadgeCount, setFollow}) => {

  useEffect(() => {
    emptyBadgeCount();
    getAlertList();
  }, [])

  const listArr = alerts;

  const handleDetail = (id, type) => () => {
    setFollow({
      isPin: type === 'follow',
      isFollow: true,
      follower_id: id,
      data: {user_id: id, type: type},
      success: () => {
        getFollowList()
      }
    });
  }

  return (
    <View style={[styles.container, gStyle.bgWhite]}>
      <ScrollView style={styles.scroll_view}>
        {listArr && listArr.map((item, index) => {
          if (item.action_type !== 'report') {
            const border_color = {
              like: styles.alert_color_red,
              comment: styles.alert_color_brown,
              save: styles.alert_color_blue,
              share: styles.alert_color_brown,
              hide: styles.alert_color_red,
              report: styles.alert_color_red,
              reply: styles.alert_color_sky,
              follow: styles.alert_color_green,
            };
            const avatar_badge = {
              like: IMAGES_PATH.alert_support,
              comment: IMAGES_PATH.alert_comment,
              save: IMAGES_PATH.alert_save,
              share: IMAGES_PATH.alert_share,
              hide: IMAGES_PATH.alert_support,
              report: IMAGES_PATH.alert_support,
              follow: IMAGES_PATH.alert_request
            };
            const content = {
              like: item.post === null ? '' : item.type === 'Post' ? item.missing_since === null ? 'support your post' : 'support your missing person post' : 'support your comment',
              comment: item.post === null ? 'comment your post' : 'comment your missing person post',
              save: item.post === null ? '' : item.type === 'Post' ? item.missing_since === null ? 'save your post' : 'save your missing person post' : 'save your comment',
              share: item.post === null ? '' : item.type === 'Post' ? item.missing_since === null ? 'share your post' : 'share your missing person post' : 'share your comment',
              hide: item.post === null ? '' : item.type === 'Post' ? item.missing_since === null ? 'hide your post' : 'hide your missing person post' : 'hide your comment',
              report: item.post === null ? '' : item.type === 'Post' ? item.missing_since === null ? 'report your post' : 'report your missing person post' : 'report your comment',
              reply: item.post === null ? '' : item.type === 'Post' ? item.missing_since === null ? 'reply your post' : 'reply your missing person post' : 'reply your comment',
              follow: 'is following you now',
            };

            return item.action_type !== 'create_missing' ? <View key={index} style={styles.simple_item}>
              <View style={styles.leftImg}>
                <View style={[styles.vwImg, border_color[item.action_type === 'comment' && item.type === 'Comment' ? 'reply' : item.action_type]]}>
                  <Image style={styles.circleImg} source={{uri: ASSET_BASE_URL + item.avatar_path}}/>
                </View>
                <Image style={styles.badgeImg} source={avatar_badge[item.action_type === 'comment' && item.type === 'Comment' ? 'reply' : item.action_type]}/>
              </View>
              <View style={styles.contentText}>
                <Text style={styles.text_content}>
                  <Text style={styles.name_primary}>{item.first_name + ' ' + item.last_name}</Text>
                  {' '}{content[item.action_type === 'comment' && item.type === 'Comment' ? 'reply' : item.action_type]}
                </Text>
              </View>
              {item.action_type === 'follow' ?
                <View style={styles.timeText}>
                  <View style={styles.rightImg}>
                    <TouchableOpacity style={styles.settingTouch} onPress={handleDetail(item.id, 'remove')}>
                      <Text style={styles.settingText}>unfollow</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={styles.text_min}>{getDiffFromToday(item.updated_at)}</Text>
                  </View>
                </View>
              : <View style={styles.timeText}>
                <View style={styles.rightImg}>
                  <Image style={styles.settingImg} source={IMAGES_PATH.setting}/>
                </View>
                <View style={styles.d_flex}>
                  <Text style={styles.text_min}>{getDiffFromToday(item.updated_at)}</Text>
                </View>
              </View>}
            </View> : <View key={index} style={styles.large_item}>
              <View style={styles.large_top_item}>
                <View style={styles.large_leftImg}>
                  <View style={styles.m_auto}>
                    <View style={styles.m_auto}>
                      <View style={[styles.large_vwImg, styles.alert_color_large_default]}>
                        <Image style={styles.circleImg} source={{uri: ASSET_BASE_URL + item.avatar_path}}/>
                      </View>
                      <Image style={styles.large_badgeImg} source={IMAGES_PATH.alert_verify}/>
                    </View>
                    <View style={[styles.large_badgeBtn]}>
                      {/*<Button*/}
                      {/*  title={'Verifed'}*/}
                      {/*  titleStyle={styles.text_white}*/}
                      {/*  buttonStyle={styles.large_badgeBtn_small}*/}
                      {/*/>*/}
                    </View>
                  </View>
                </View>
                <View style={styles.large_contentText}>
                  <Text style={[styles.large_text_top_content, styles.text_missing_color]}>Missing Person Alert</Text>
                  <Text style={styles.large_text_bottom_content}>{item.first_name}</Text>
                  <Text style={styles.large_text_content}>Missing
                    Since: {(item.missing_since === null) ? '' : moment(item.missing_since).format("dddd, MMMM D, YYYY")}</Text>
                  <Text style={styles.large_text_content}>Missing
                    From: {(item.duo_location === null) ? '' : item.duo_location}</Text>
                  {/*<View>*/}
                  {/*  <Text style={styles.large_text_verifed}>Your post has been Verifed</Text>*/}
                  {/*</View>*/}
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
                    <Image style={styles.large_settingImg} source={IMAGES_PATH.setting}/>
                  </View>
                  <View style={styles.d_flex}>
                    <Text style={styles.text_min}>{getDiffFromToday(item.updated_at)}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.large_bottom_item}>
                <View style={styles.large_leftImg}>
                  <Image style={styles.uploadImg} source={IMAGES_PATH.bx_upload}/>
                </View>
                <View style={styles.large_bottom_contentText}>
                  <Text style={styles.uploadText}>
                    Boost Your Missing Person Post for more reach
                  </Text>
                </View>
              </View>
            </View>
          }
        })}
        {/*<View style={styles.simple_item}>*/}
        {/*  <View style={styles.leftImg}>*/}
        {/*    <View style={[styles.vwImg, styles.alert_color_green]}>*/}
        {/*      <Image style={styles.circleImg} source={IMAGES_PATH.avatar}/>*/}
        {/*    </View>*/}
        {/*    <Image style={styles.badgeImg} source={IMAGES_PATH.alert_request}/>*/}
        {/*  </View>*/}
        {/*  <View style={styles.contentText}>*/}
        {/*    <Text style={styles.text_content}><Text style={styles.name_primary}>Roy Adams</Text>{' '}supports your post</Text>*/}
        {/*  </View>*/}
        {/*  <View style={styles.timeText}>*/}
        {/*    <View style={styles.rightImg}>*/}
        {/*      <TouchableOpacity style={styles.settingTouch}>*/}
        {/*        <Text style={styles.settingText}>Accept</Text>*/}
        {/*      </TouchableOpacity>*/}
        {/*    </View>*/}
        {/*    <View>*/}
        {/*      <Text style={styles.text_min}>15min</Text>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*</View>*/}
        {/*<View style={styles.large_item}>*/}
        {/*  <View style={styles.large_top_item}>*/}
        {/*    <View style={styles.large_leftImg}>*/}
        {/*      <View style={styles.m_auto}>*/}
        {/*        <View style={styles.m_auto}>*/}
        {/*          <View style={[styles.large_vwImg, styles.alert_color_large_default]}>*/}
        {/*            <Image style={styles.circleImg} source={IMAGES_PATH.avatar}/>*/}
        {/*          </View>*/}
        {/*          <Image style={styles.large_badgeImg} source={IMAGES_PATH.alert_verify}/>*/}
        {/*        </View>*/}
        {/*        <View style={[styles.large_badgeBtn]}>*/}
        {/*          <Button*/}
        {/*            title={'Verifed'}*/}
        {/*            titleStyle={styles.text_white}*/}
        {/*            buttonStyle={styles.large_badgeBtn_small}*/}
        {/*          />*/}
        {/*        </View>*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*    <View style={styles.large_contentText}>*/}
        {/*      <Text style={[styles.large_text_top_content, styles.text_missing_color]}>Missing Person Alert</Text>*/}
        {/*      <Text style={styles.large_text_bottom_content}>Adam Sullivan</Text>*/}
        {/*      <Text style={styles.large_text_content}>Missing Since: Tue. 21 December, 2020</Text>*/}
        {/*      <Text style={styles.large_text_content}>Missing From: Lisbon</Text>*/}
        {/*      <View>*/}
        {/*        <Text style={styles.large_text_verifed}>Your post has been Verifed</Text>*/}
        {/*      </View>*/}
        {/*      /!*<View style={styles.d_flex}>*!/*/}
        {/*      /!*  <Text style={styles.large_text_account_first}>Posted by </Text>*!/*/}
        {/*      /!*  <View style={[styles.verifed_img]}>*!/*/}
        {/*      /!*    <Image style={styles.circleImg} source={IMAGES_PATH.avatar} />*!/*/}
        {/*      /!*  </View>*!/*/}
        {/*      /!*  <Text style={styles.large_text_account_last}>{' '}@Laurel_Lawson</Text>*!/*/}
        {/*      /!*</View>*!/*/}
        {/*    </View>*/}
        {/*    <View style={styles.timeText}>*/}
        {/*      <View style={styles.rightImg}>*/}
        {/*        <Image style={styles.large_settingImg} source={IMAGES_PATH.setting}/>*/}
        {/*      </View>*/}
        {/*      <View style={styles.d_flex}>*/}
        {/*        <Text style={styles.text_min}>15min</Text>*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*  <View style={styles.large_bottom_item}>*/}
        {/*    <View style={styles.large_leftImg}>*/}
        {/*      <Image style={styles.uploadImg} source={IMAGES_PATH.bx_upload}/>*/}
        {/*    </View>*/}
        {/*    <View style={styles.large_bottom_contentText}>*/}
        {/*      <Text style={styles.uploadText}>*/}
        {/*        Boost Your Missing Person Post for more reach*/}
        {/*      </Text>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*</View>*/}
        {/*<View style={styles.large_item}>*/}
        {/*  <View style={styles.large_top_item}>*/}
        {/*    <View style={styles.large_leftImg}>*/}
        {/*      <View style={styles.m_auto}>*/}
        {/*        <View style={styles.m_auto}>*/}
        {/*          <View style={[styles.large_vwImg, styles.alert_color_large_default]}>*/}
        {/*            <Image style={styles.circleImg} source={IMAGES_PATH.avatar}/>*/}
        {/*          </View>*/}
        {/*          <Image style={styles.large_badgeImg} source={IMAGES_PATH.alert_verify}/>*/}
        {/*        </View>*/}
        {/*        <View style={[styles.large_badgeBtn]}>*/}
        {/*          <Button*/}
        {/*            title={'Verifed'}*/}
        {/*            titleStyle={styles.text_white}*/}
        {/*            buttonStyle={styles.large_badgeBtn_small}*/}
        {/*          />*/}
        {/*        </View>*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*    <View style={styles.large_contentText}>*/}
        {/*      <Text style={[styles.large_text_top_content, styles.text_found_color]}>Missing Person Alert</Text>*/}
        {/*      <Text style={styles.large_text_bottom_content}>Adam Sullivan</Text>*/}
        {/*      <Text style={styles.large_text_content}>Missing Since: Tue. 21 December, 2020</Text>*/}
        {/*      <Text style={styles.large_text_content}>Missing From: Lisbon</Text>*/}
        {/*      <View style={styles.d_flex}>*/}
        {/*        <Text style={styles.large_text_account_first}>Posted by </Text>*/}
        {/*        <View style={[styles.verifed_img]}>*/}
        {/*          <Image style={styles.circleImg} source={IMAGES_PATH.avatar}/>*/}
        {/*        </View>*/}
        {/*        <Text style={styles.large_text_account_last}>{' '}@Laurel_Lawson</Text>*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*    <View style={styles.timeText}>*/}
        {/*      <View style={styles.rightImg}>*/}
        {/*        <Image style={styles.large_settingImg} source={IMAGES_PATH.setting}/>*/}
        {/*      </View>*/}
        {/*      <View style={styles.d_flex}>*/}
        {/*        <Text style={styles.text_min}>15min</Text>*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*  <View style={styles.d_flex}>*/}
        {/*    <View style={[styles.d_flex, styles.m_auto]}>*/}
        {/*      <Text style={[styles.m_auto, styles.large_text_top_content, styles.text_found_color]}>Thanks to Community*/}
        {/*        Member</Text>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*  <View style={[styles.d_flex]}>*/}
        {/*    <View style={[styles.m_auto, gStyle.wFull]}>*/}
        {/*      <View style={[styles.share_content, styles.d_flex]}>*/}
        {/*        <View style={[styles.m_auto, styles.d_flex]}>*/}
        {/*          <View style={[styles.share_vwImg, styles.alert_color_white]}>*/}
        {/*            <Image style={styles.shareImg} source={IMAGES_PATH.avatar}/>*/}
        {/*          </View>*/}
        {/*          <View style={[styles.share_vwImg, styles.alert_color_white]}>*/}
        {/*            <Image style={styles.shareImg} source={IMAGES_PATH.avatar}/>*/}
        {/*          </View>*/}
        {/*          <View style={[styles.share_vwImg, styles.alert_color_white]}>*/}
        {/*            <Image style={styles.shareImg} source={IMAGES_PATH.avatar}/>*/}
        {/*          </View>*/}
        {/*        </View>*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*  <View style={styles.large_bottom_item}>*/}
        {/*    <View style={styles.large_bottom_verify_contentText}>*/}
        {/*      <Image style={styles.bottom_uploadImg} source={IMAGES_PATH.bx_share}/>*/}
        {/*      <Text style={styles.bottom_uploadText}>*/}
        {/*        {'   '}Share the good news*/}
        {/*      </Text>*/}
        {/*    </View>*/}
        {/*  </View>*/}
        {/*</View>*/}
      </ScrollView>
    </View>
  )
};

Alert.propTypes = {
  getAlertList: PropTypes.func,
  alerts: PropTypes.array,
};

const actions = {
  getAlertList, emptyBadgeCount, setFollow
};

const selector = createStructuredSelector({
  alerts: alertsListSelector,
});

export default compose(
  connect(selector, actions)
)(Alert);
