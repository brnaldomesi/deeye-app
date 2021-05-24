import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View
} from 'react-native';
import {
  Avatar,
  Button,
  Divider
} from 'react-native-elements';
import React, { useState } from 'react';
import {
  Size,
  absolute,
  bgBottomPrimary,
  bgPrimary,
  bgTransparent,
  bgWhite,
  flexOne,
  flexRow,
  fontWeightBold,
  itemsCenter,
  itemsEnd,
  justifyAround,
  justifyBetween,
  m0,
  mb2,
  ml1,
  mlp5,
  mrAuto,
  mt1,
  mtp5,
  mxAuto,
  my1,
  myAuto,
  myp5,
  p0,
  pDot7,
  primaryColor,
  pt1,
  pxp5,
  py1,
  pyDot7,
  pyp5,
  relative,
  resizeContain,
  textBase,
  textDot5,
  textDot7,
  textXl
} from 'src/styles';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import { IMAGES_PATH } from 'src/config/constants';
import MyButton from 'src/components/MyButton';
import { Switch } from '@5stones/react-native-switch';
import styles from './styles';

const Menu = ({ navigation }) => {
  const [tempState, setTempState] = useState(true)

  const handleClose = () => {
    navigation.goBack()
  }

  const handleAdd = () => {

  }

  const handleLogout = () => {

  }

  const handleLink = () => {

  }

  const switchCollapse = () => {

  }

  const handleSwitch = () => {
    setTempState(tempState => !tempState)
  }


  return (
    <View style={flexOne}>
      <View style={relative}>
        <FastImage
          style={styles.banner}
          source={IMAGES_PATH.banner}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={[absolute, styles.close]}>
          <Button
            onPress={handleClose}
            buttonStyle={bgTransparent}
            icon={
              <Image
                style={[styles.sizeTwo, resizeContain]}
                source={IMAGES_PATH.close}
              />
            }
          />
        </View>
      </View>
      <View style={[flexRow, flexOne, bgBottomPrimary, pt1]}>
        <View style={justifyBetween}>
          <View style={[pxp5, itemsCenter]}>
            <Text style={[textDot5, primaryColor, fontWeightBold]}>Switch Account</Text>
            <View style={pyp5}>
              <Avatar
                rounded
                source={IMAGES_PATH.avatar}
                style={styles.avatar}
              />
            </View>
            <View style={pyp5}>
              <Avatar
                rounded
                source={IMAGES_PATH.avatar}
                style={styles.avatar}
              />
            </View>
            <View style={pyp5}>
              <Avatar
                rounded
                source={IMAGES_PATH.avatar}
                style={styles.avatar}
              />
            </View>
          </View>
          <View style={mb2}>
            <Divider style={bgPrimary} />
            <MyButton onPress={handleAdd} style={pyDot7}>
              <Image style={[styles.avatar, resizeContain]} source={IMAGES_PATH.addCircle} />
              <Text style={[textDot7, primaryColor]}>Add Account</Text>
            </MyButton>
            <Divider style={bgPrimary} />
            <MyButton onPress={handleLogout} style={pyDot7}>
              <Image style={[styles.avatar, resizeContain]} source={IMAGES_PATH.power} />
              <Text style={[textDot7, primaryColor]}>Log out</Text>
            </MyButton>
            <Divider style={bgPrimary} />
          </View>
        </View>
        <View style={[flexOne, relative]}>
          <Avatar
            rounded
            source={IMAGES_PATH.avatar}
            style={[absolute, styles.avatarBig]}
          />
          <View style={itemsEnd}>
            <Button
              title="View Profile"
              type="outline"
              buttonStyle={[styles.menuBtn, bgWhite]}
              titleStyle={[textDot7]}
            />
          </View>
          <ScrollView>
            <View style={flexRow}>
              <Text style={textXl}>Patric Adams</Text>
              <View style={[myAuto, ml1]}>
                <Image source={IMAGES_PATH.patchCheckSmall} style={[styles.sizeOne, resizeContain]} />
              </View>
            </View>
            <View style={myp5}>
              <Button
                title="@PatricAdams"
                buttonStyle={[p0, mrAuto, bgTransparent]}
                titleStyle={[primaryColor, textDot7]}
                onPress={handleLink}
              />
            </View>
            <Text>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
            <View style={[flexRow, myp5]}>
              <Text style={fontWeightBold}>12K Followers</Text>
              <Text style={[ml1, fontWeightBold]}>7K Follows</Text>
              <Text style={[ml1, fontWeightBold]}>100 Supports</Text>
            </View>
            <ImageBackground source={IMAGES_PATH.activityBadge} style={[resizeContain, styles.activityBadge]}>
              <Text style={[primaryColor, fontWeightBold, mxAuto]}>2</Text>
            </ImageBackground>
            <View style={[pDot7, mtp5, bgWhite]}>
              {/*<View style={[flexRow, justifyBetween]}>*/}
              {/*  <View style={flexRow}>*/}
              {/*    <Image source={IMAGES_PATH.people} style={[resizeContain, styles.settings]} />*/}
              {/*    <Text style={[fontWeightBold, textBase, ml1, myAuto]}>Groups</Text>*/}
              {/*  </View>*/}
              {/*  <Button*/}
              {/*    onPress={switchCollapse}*/}
              {/*    buttonStyle={bgTransparent} */}
              {/*    icon={*/}
              {/*      <Image source={IMAGES_PATH.plusSquare} style={[resizeContain, styles.sizeOne]} />*/}
              {/*    } */}
              {/*  />*/}
              {/*</View>*/}

              {/*<View style={[flexRow, pyp5, mlp5]}>*/}
              {/*  <Image source={IMAGES_PATH.building} style={[resizeContain, styles.settings]} />*/}
              {/*  <View style={flexOne}>*/}
              {/*    <View style={[flexRow, justifyBetween]}>*/}
              {/*      <Text style={[fontWeightBold, textBase, ml1, myAuto]}>Organizations</Text>*/}
              {/*      <Button*/}
              {/*        onPress={switchCollapse}*/}
              {/*        buttonStyle={bgTransparent}*/}
              {/*        icon={*/}
              {/*          <Image source={IMAGES_PATH.minisSquare} style={[resizeContain, styles.sizeOne]} />*/}
              {/*        }*/}
              {/*      />*/}
              {/*    </View>*/}
              {/*    <View style={ml1}>*/}
              {/*      <View style={[flexRow, pyp5]}>*/}
              {/*        <Avatar*/}
              {/*          rounded*/}
              {/*          source={{*/}
              {/*            uri:*/}
              {/*              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',*/}
              {/*          }}*/}
              {/*          style={styles.settings}*/}
              {/*        />*/}
              {/*        <Text style={[myAuto, styles.subtitle]}>Peas In Their Pods, Inc.</Text>*/}
              {/*        <Image source={IMAGES_PATH.patchCheckSmall} style={[styles.sizeOne, resizeContain, myAuto]} />*/}
              {/*      </View>*/}
              {/*      <View style={[flexRow, pyp5]}>*/}
              {/*        <Avatar*/}
              {/*          rounded*/}
              {/*          source={{*/}
              {/*            uri:*/}
              {/*              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',*/}
              {/*          }}*/}
              {/*          style={styles.settings}*/}
              {/*        />*/}
              {/*        <Text style={[myAuto, styles.subtitle]}>National Center for Missing & Exploited Children</Text>*/}
              {/*        <Image source={IMAGES_PATH.patchCheckSmall} style={[styles.sizeOne, resizeContain, myAuto]} />*/}
              {/*      </View>*/}
              {/*      <View style={[flexRow, pyp5]}>*/}
              {/*        <Avatar*/}
              {/*          rounded*/}
              {/*          source={{*/}
              {/*            uri:*/}
              {/*              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',*/}
              {/*          }}*/}
              {/*          style={styles.settings}*/}
              {/*        />*/}
              {/*        <Text style={[myAuto, styles.subtitle]}>TIPSTER App</Text>*/}
              {/*        <Image source={IMAGES_PATH.patchCheckSmall} style={[styles.sizeOne, resizeContain, myAuto]} />*/}
              {/*      </View>*/}
              {/*      <View style={[flexRow, pyp5]}>*/}
              {/*        <Avatar*/}
              {/*          rounded*/}
              {/*          source={{*/}
              {/*            uri:*/}
              {/*              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',*/}
              {/*          }}*/}
              {/*          style={styles.settings}*/}
              {/*        />*/}
              {/*        <Text style={[myAuto, styles.subtitle]}>Black and Missing, Inc.</Text>*/}
              {/*        <Image source={IMAGES_PATH.patchCheckSmall} style={[styles.sizeOne, resizeContain, myAuto]} />*/}
              {/*      </View>*/}
              {/*    </View>*/}
              {/*    <Button*/}
              {/*      title="Create Your Organization"*/}
              {/*      type="outline"*/}
              {/*      buttonStyle={[styles.menuBtn, mxAuto, my1]}*/}
              {/*      titleStyle={[textDot7]}*/}
              {/*    />*/}
              {/*  </View>*/}
              {/*</View>*/}

              <View style={flexRow}>
                <Image source={IMAGES_PATH.gear} style={[resizeContain, styles.settings]} />
                <Text style={[fontWeightBold, textBase, ml1, myAuto]}>SETTINGS</Text>
              </View>

              <View style={[flexRow, mt1, mlp5]}>
                <Image source={IMAGES_PATH.uiChecks} style={[resizeContain, styles.settings]} />
                <View style={flexOne}>
                  <View style={[flexRow, justifyBetween]}>
                    <Text style={[fontWeightBold, textBase, ml1]}>Preference</Text>
                    <Button
                      onPress={switchCollapse}
                      buttonStyle={bgTransparent}
                      icon={
                        <Image source={IMAGES_PATH.minisSquare} style={[resizeContain, styles.sizeOne]} />
                      }
                    />
                  </View>

                  <View style={[flexRow, ml1, myp5, justifyBetween]}>
                    <View style={flexRow}>
                      <Image source={IMAGES_PATH.bullseye} style={[resizeContain, styles.settings]} />
                      <Text style={[ml1, myAuto]}>Proximity Alert</Text>
                    </View>
                    <View style={myAuto}>
                      <Switch
                        value={tempState}
                        onValueChange={handleSwitch}
                        activeText={'NO'}
                        inActiveText={'OFF'}
                        circleSize={Size(1.2)}
                        circleBorderWidth={0}
                        backgroundActive={'green'}
                        backgroundInactive={'red'}
                        circleActiveColor={'white'}
                        circleInActiveColor={'white'}
                        changeValueImmediately={true}
                        switchLeftPx={Size(.32)}
                        switchRightPx={Size()}
                        switchWidthMultiplier={Size(.18)}
                      />
                    </View>
                  </View>

                  <View style={[flexRow, ml1, myp5, justifyBetween]}>
                    <View style={flexRow}>
                      <Image source={IMAGES_PATH.broadcastPin} style={[resizeContain, styles.settings]} />
                      <Text style={[ml1, myAuto]}>Feeds Alert</Text>
                    </View>
                    <View style={myAuto}>
                      <Switch
                        value={tempState}
                        onValueChange={handleSwitch}
                        activeText={'NO'}
                        inActiveText={'OFF'}
                        circleSize={Size(1.2)}
                        circleBorderWidth={0}
                        backgroundActive={'green'}
                        backgroundInactive={'red'}
                        circleActiveColor={'white'}
                        circleInActiveColor={'white'}
                        changeValueImmediately={true}
                        switchLeftPx={Size(.32)}
                        switchRightPx={Size()}
                        switchWidthMultiplier={Size(.18)}
                      />
                    </View>
                  </View>

                  <View style={[flexRow, ml1, myp5, justifyBetween]}>
                    <View style={flexRow}>
                      <Image source={IMAGES_PATH.lightning} style={[resizeContain, styles.settings]} />
                      <Text style={[ml1, myAuto]}>Found Person Alert</Text>
                    </View>
                    <View style={myAuto}>
                      <Switch
                        value={tempState}
                        onValueChange={handleSwitch}
                        activeText={'NO'}
                        inActiveText={'OFF'}
                        circleSize={Size(1.2)}
                        circleBorderWidth={0}
                        backgroundActive={'green'}
                        backgroundInactive={'red'}
                        circleActiveColor={'white'}
                        circleInActiveColor={'white'}
                        changeValueImmediately={true}
                        switchLeftPx={Size(.32)}
                        switchRightPx={Size()}
                        switchWidthMultiplier={Size(.18)}
                      />
                    </View>
                  </View>

                  <View style={[flexRow, ml1, myp5, justifyBetween]}>
                    <View style={flexRow}>
                      <Image source={IMAGES_PATH.geo} style={[resizeContain, styles.settings]} />
                      <Text style={[ml1, myAuto]}>Geo-Location Alert</Text>
                    </View>
                    <View style={myAuto}>
                      <Switch
                        value={tempState}
                        onValueChange={handleSwitch}
                        activeText={'NO'}
                        inActiveText={'OFF'}
                        circleSize={Size(1.2)}
                        circleBorderWidth={0}
                        backgroundActive={'green'}
                        backgroundInactive={'red'}
                        circleActiveColor={'white'}
                        circleInActiveColor={'white'}
                        changeValueImmediately={true}
                        switchLeftPx={Size(.32)}
                        switchRightPx={Size()}
                        switchWidthMultiplier={Size(.18)}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View style={[flexRow, mt1, mlp5]}>
                <Image source={IMAGES_PATH.lifePreserver} style={[resizeContain, styles.settings]} />
                <View style={flexOne}>
                  <View style={[flexRow, justifyBetween]}>
                    <Text style={[fontWeightBold, textBase, ml1]}>Help</Text>
                    <Button
                      onPress={switchCollapse}
                      buttonStyle={bgTransparent}
                      icon={
                        <Image source={IMAGES_PATH.minisSquare} style={[resizeContain, styles.sizeOne]} />
                      }
                    />
                  </View>

                  <View style={[flexRow, ml1, myp5, justifyBetween]}>
                    <View style={flexRow}>
                      <Image source={IMAGES_PATH.chatText} style={[resizeContain, styles.settings]} />
                      <Text style={[ml1, mtp5]}>Contact Us</Text>
                    </View>
                    <Button
                      onPress={switchCollapse}
                      buttonStyle={[bgTransparent, myAuto]}
                      icon={<AntIcon name="rightsquare" size={Size()} />}
                    />
                  </View>
                </View>
              </View>

              <View style={[flexRow, mt1, mlp5]}>
                <Image source={IMAGES_PATH.signpost2} style={[resizeContain, styles.settings]} />
                <View style={flexOne}>
                  <View style={[flexRow, justifyBetween]}>
                    <Text style={[fontWeightBold, textBase, ml1]}>Privacy</Text>
                    <Button
                      onPress={switchCollapse}
                      buttonStyle={bgTransparent}
                      icon={
                        <Image source={IMAGES_PATH.minisSquare} style={[resizeContain, styles.sizeOne]} />
                      }
                    />
                  </View>

                  <View style={[flexRow, ml1, myp5, justifyBetween]}>
                    <View style={flexRow}>
                      <Image source={IMAGES_PATH.fileMedical} style={[resizeContain, styles.settings]} />
                      <Text style={[ml1, mtp5]}>Term & Privacy Policy</Text>
                    </View>
                    <Button
                      onPress={switchCollapse}
                      buttonStyle={[bgTransparent, myAuto]}
                      icon={<AntIcon name="rightsquare" size={Size()} />}
                    />
                  </View>
                </View>
              </View>

              <View style={[flexRow, mt1, mlp5]}>
                <Image source={IMAGES_PATH.execlamationCircleFill} style={[resizeContain, styles.settings]} />
                <View style={flexOne}>
                  <View style={[flexRow, justifyBetween]}>
                    <Text style={[fontWeightBold, textBase, ml1]}>About</Text>
                    <Button
                      onPress={switchCollapse}
                      buttonStyle={bgTransparent}
                      icon={
                        <Image source={IMAGES_PATH.minisSquare} style={[resizeContain, styles.sizeOne]} />
                      }
                    />
                  </View>

                  <View style={[flexRow, ml1, myp5, justifyBetween]}>
                    <View style={flexRow}>
                      <Image source={IMAGES_PATH.upcScan} style={[resizeContain, styles.settings]} />
                      <Text style={[ml1, mtp5]}>Version</Text>
                    </View>
                    <Text>1.0.1.4</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
};

export default Menu;
