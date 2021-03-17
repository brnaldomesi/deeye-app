import {
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  View
} from 'react-native';
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
      </ScrollView>
    </View>
  )
}

export default Alert;
