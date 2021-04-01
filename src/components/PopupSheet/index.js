import * as RootNavigation from 'src/navigators/Ref';

import {
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  BottomSheet,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import React, {useCallback, useState, useRef} from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import {
  Size,
  itemsCenter,
  resizeCover
} from 'src/styles';

import { IMAGES_PATH } from 'src/config/constants';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import Mine from './Mine';
import Report1 from './Others/Report1';

// const REPORT_THIS_POST = 0
// const NOT_WANT_TO_SEE = 1
// const menuItems = {
//   REPORT_THIS_POST,
//   NOT_WANT_TO_SEE
// }

const PopupSheet = ({
  post,
  isMyPost,
}) => {

  const handleOpen = () => {
    setIsVisible(true);
  }
  const handleClose = () => {
    setIsVisible(false);
    // refRBSheet.current.close();
  }

  const [value, setValue] = useState(0);
  const [step, setStep] = useState(0);

  const handleSelect = (step, value) => {
    setStep(step);
    setSelectValue(value);
  }

  const [isVisible, setIsVisible] = useState(false);
  // const refRBSheet = useRef();

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <Image style={[styles.settingImg, resizeCover]} source={IMAGES_PATH.setting} />
      </TouchableOpacity>
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ marginTop: Size(0), backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
      >
      {/* <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}

        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            width: 80,
            height: 10,
            borderRadius: 20,
            backgroundColor: '#e2e2e2',
            alignSelf: 'center',
            marginTop: -22,
          }
        }}
      > */}
        <View style={styles.top}>
          <View style={styles.topStyle}></View>
          <Icon style={styles.close} name="x-circle" onPress={handleClose}></Icon>
        </View>
        {!isMyPost ? (
        <Report1 post={post} onMenuItemPress={this.handleSelect} />
        ) : (
        <Mine post={post} />
        )}
      {/* </RBSheet> */}
      </BottomSheet>
    </View>
  )
};

export default PopupSheet;
