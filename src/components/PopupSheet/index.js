import * as RootNavigation from 'src/navigators/Ref';

import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import * as gStyle from 'src/styles';
import {
  BottomSheet,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import React, {useCallback, useState, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { 
  exportComponentAsJPEG, 
  exportComponentAsPDF, 
  exportComponentAsPNG } from 'react-component-export-image';
import {
  Size,
  itemsCenter,
  resizeCover
} from 'src/styles';
import {
  hidePost,
  savePost,
  reportPost,
  deletePost,
} from 'src/redux/modules/posts';
import {setFollow} from "src/redux/modules/follow";
import { IMAGES_PATH } from 'src/config/constants';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import Mine from './Mine';
import Others from './Others';
import Report from './Others/Report'

const ComponentToPrint = React.forwardRef((props, ref) => (
  <View ref={ref}><Text>Comming soon...</Text></View>
));

const PopupSheet = ({
  post,
  isMyPost,
  hidePost,
  savePost,
  reportPost,
  setFollow,
  isShare,
  deletePost,
}) => {

  const componentRef = useRef();
  const handleOpen = () => {
    setIsVisible(true);
    refRBSheet.current.open();
  }

  const handleClose = () => {
    setReportPage('');
    setIsVisible(false);
    refRBSheet.current.close();
  }

  const handleBack = () => {
    setReportPage('report');
  }

  const [reportPage, setReportPage] = useState();
  const postType = post.post_type;
  const handlePress = (type, data) => {
    if(type === "report") {
      setReportPage(type);
    } else {
      if(type === "hate") {
        setIsVisible(false);
        refRBSheet.current.close();
        RootNavigation.navigate('Hate', {post:post.id});
      } else if(type === "save") {
        setIsVisible(false);
        refRBSheet.current.close();
        savePost({ id: post.id });
      } else if(type === "share") {
        setIsVisible(false);
        refRBSheet.current.close();
        if (isShare) {
          RootNavigation.navigate('SharePost', {post: post});
        }
      } else if (type === "down") {
        setIsVisible(false);
        refRBSheet.current.close();
        // const missingContent = data.post_source.missing_post_content;
        // exportComponentAsJPEG(componentRef);
      } else if (type === "follow" || type === "unfollow") {
        setIsVisible(false);
        refRBSheet.current.close();
        if (postType !== 'Share') {
          setIsVisible(false);
          refRBSheet.current.close();
          setFollow({
            isPin: false,
            isFollow: false,
            follower_id: post.author.user_id,
            data: {
              user_id: post.author.user_id,
              type: type === "follow" ? 'follow' : 'unfollow'
            }
          });
        }
      } else if (type === "edit") {
        setIsVisible(false);
        refRBSheet.current.close();
        RootNavigation.navigate(post.post_type === 'MissingPerson' ? 'MissingPostEdit' : 'PostEdit', {post});
      } else if (type === "delete") {
        setIsVisible(false);
        refRBSheet.current.close();
        setTimeout(() => {
          Alert.alert(
            'Delete',
            'Are you sure to delete?',
            [
              {
                text: 'No'
              },
              {
                text: 'Yes',
                onPress: () => {
                  deletePost({id: post.id});
                }
              }
            ]
          );
        }, 100);
      }
    }
  }

  const handleSelect = (action) => {
    if(action === "reason1" || action === "reason2" || action === "reason3")
      setReportPage(action);
    else {
      if(action === "hate") {
        setIsVisible(false);
        refRBSheet.current.close();
        RootNavigation.navigate('Hate', {post:post.id});
      } else {
        reportPost({id: post.id, data: { reason: action}});
        hidePost({id: post.id});
        setIsVisible(false);
        refRBSheet.current.close();
      }
    }
  }

  const [isVisible, setIsVisible] = useState(false);

  const title = {
    report: [
      { header: "", footer: "Why are you reporting this?"},
    ],
    reason1: [
      { header: "Adult content", footer: "Select a reporting reason:"},
    ],
    reason2: [
      { header: "Violence or physical harm", footer: "Select a reporting reason:" },
    ],
    reason3: [
      { header: "Harassment or hateful speech", footer: "Select a reporting reason:" },
    ]
  }

  const data = {
    report: [
      { title: 'Suspicious or fake', content: '', onCallback: "fake"},
      { title: 'Harassment or hateful speech', content: '', onCallback: "reason3" },
      { title: 'Violence or physical ham', content: '', onCallback: "reason2" },
      { title: 'Adult content', content: '', onCallback: "reason1" },
      { title: 'Person has be found', content: '', onCallback: "found" },
      { title: 'I do not want to see this', content: 'if none of these resons apply, let us know why you do not like this post', onCallback: "hate" },
    ],
    reason1: [
      { title: 'Nudity or sexual content', content: 'Nudity, sexual scenes or Language, or sex trafficking', onCallback: "reason1_1" },
      { title: 'Sexual harassment', content: 'Unwanted romantic advances, requests for sexual favors, or unwelcoming', onCallback: "reason1_2" },
      { title: 'Shocking or gory', content: 'Shocking or graphic content', onCallback: "reason1_3" },
    ],
    reason2: [
      { title: 'Incites violence or is a threat', content: 'Encouraging violent acts or threatening physical harm', onCallback: "reason2_1" },
      { title: 'Self-harm', content: 'Suicidal remarks or threatening to harm oneself', onCallback: "reason2_2" },
      { title: 'Shocking or gory', content: 'Shocking or graphic content', onCallback: "reason2_3" },
      { title: 'Terrorism or act of extreme violence', content: 'Depicting or encouraging terrorist acts or severe harm', onCallback: "reason2_4" },
    ],
    reason3: [
      { title: 'Bullying or trolling', content: 'Attacking or intimidating others, or deliberately and repeatedly disrupting conversation', onCallback: "reason3_1" },
      { title: 'Sexual harassment', content: 'Unwanted romantic advances, requests for sexual favors, or unwelcoming sexual remarks', onCallback: "reason3_2" },
      { title: 'Hateful or abusive speech', content: 'Hateful, degrading, or inflammatory speech', onCallback: "reason3_3" },
      { title: 'Spam', content: 'Sharing irrelevant or repeated content to boost visibility or for monetary again', onCallback: "reason3_4" },
    ]
  }

  const refRBSheet = useRef();
  const [height, setHeight] = useState(30);
  return (
    <React.Fragment>

    <View>
      {/* <ComponentToPrint ref={componentRef} /> */}
      <TouchableOpacity
        onPress={handleOpen}
      >
        <Image style={[styles.settingImg]} source={IMAGES_PATH.setting} />
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: height + 60,
          },
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "gray",
            width: 80,
            height: 10
          }
        }}
      >
        <View onLayout={(e) => setHeight(e.nativeEvent.layout.height)}>
          <View style={styles.top}>
            <Icon style={styles.close} name="x-circle" onPress={handleClose}></Icon>
            {(reportPage === 'reason1' || reportPage === 'reason2' || reportPage === 'reason3') ? <Icon style={styles.back} name="arrow-left-circle" onPress={handleBack}></Icon> : <></>}
          </View>
          {reportPage ? (
            <Report data={data[reportPage]} title={title[reportPage]} onMenuItemSelect={handleSelect}/>
          ):(
            !isMyPost ? (
              <Others post={post} onMenuItemPress={handlePress} />
            ) : (
              <Mine post={post} onMenuItemPress={handlePress} />
            )
          )}
        </View>
      </RBSheet>
    </View>
    </React.Fragment>
  )
};

const actions = {
  hidePost,
  savePost,
  reportPost,
  setFollow,
  deletePost,
}

export default compose(
  connect(null, actions)
)(PopupSheet);