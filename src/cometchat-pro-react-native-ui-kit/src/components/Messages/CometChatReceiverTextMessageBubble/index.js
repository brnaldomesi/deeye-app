import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import theme from '../../../resources/theme';
import Autolink from 'react-native-autolink';
import CometChatThreadedMessageReplyCount from '../CometChatThreadedMessageReplyCount';
import CometChatReadReceipt from '../CometChatReadReceipt';
import { CometChatAvatar } from '../../Shared';
import style from './styles';
import { CometChatMessageReactions } from '../../Messages/Extensions';
import * as enums from '../../../utils/enums';
import * as actions from '../../../utils/actions';
import { CometChat } from '@cometchat-pro/react-native-chat';

import * as RootNavigation from "../../../../../navigators/Ref";
import FastImage from "react-native-fast-image";
import {Size} from "../../../../../styles";
import {ASSET_BASE_URL} from "../../../../../config/apipath";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const CometChatReceiverTextMessageBubble = (props) => {
  const [message, setMessage] = useState({
    ...props.message,
    messageFrom: enums.MESSAGE_FROM_RECEIVER,
  });
  const prevMessage = usePrevious(message);
  const viewTheme = { ...theme, ...props.theme };
  let senderAvatar = null;
  if (message.receiverType === CometChat.RECEIVER_TYPE.GROUP) {
    senderAvatar = { uri: message.sender.avatar };
  }

  /**
   * Handler that parses text and wraps URLs, phone numbers, emails, social handles, hashtags, and more with Text nodes and onPress handlers.
   * @param
   */

  const getMessageText = () => {
    return (
      <Autolink
        text={message.text}
        style={style.autolinkStyle}
        textProps={{ selectable: true }}
        linkProps={{ suppressHighlighting: true }}
        linkStyle={style.messageLinkStyle}
      />
    );
  };
  useEffect(() => {
    const previousMessageStr = JSON.stringify(prevMessage);
    const currentMessageStr = JSON.stringify(props.message);
    if (previousMessageStr !== currentMessageStr) {
      const newMessage = {
        ...props.message,
        messageFrom: enums.MESSAGE_FROM_RECEIVER,
      };
      setMessage(newMessage);
    }
  }, [props]);
  let messageText = getMessageText();
  if (Object.prototype.hasOwnProperty.call(message, 'metadata')) {
    const { metadata } = message;
    const injectedObject = metadata['@injected'];
    if (
      injectedObject &&
      Object.prototype.hasOwnProperty.call(injectedObject, 'extensions')
    ) {
      const extensionsObject = injectedObject.extensions;
      if (
        extensionsObject &&
        Object.prototype.hasOwnProperty.call(extensionsObject, 'link-preview')
      ) {
        const linkPreviewObject = extensionsObject['link-preview'];
        if (
          linkPreviewObject &&
          Object.prototype.hasOwnProperty.call(linkPreviewObject, 'links') &&
          linkPreviewObject.links.length
        ) {
          const linkObject = linkPreviewObject.links[0];
          const pattern = /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)(\S+)?/;
          const linkText = linkObject.url.match(pattern)
            ? 'View on Youtube'
            : 'Visit';
          messageText = (
            <View
              style={[
                style.messagePreviewContainerStyle,
                { backgroundColor: viewTheme.backgroundColor.white },
              ]}>
              <View style={style.messagePreviewWrapperStyle}>
                <Image
                  style={
                    linkObject.image
                      ? style.previewImageStyle
                      : style.previewImageIconStyle
                  }
                  source={{
                    uri: linkObject.image
                      ? linkObject.image
                      : linkObject.favicon,
                  }}
                  resizeMode="contain"
                />
                <View
                  style={[
                    style.previewDataStyle,
                    { borderColor: viewTheme.borderColor.primary },
                  ]}>
                  {linkObject.title ? (
                    <View style={style.previewTitleStyle}>
                      <Text
                        style={[
                          style.linkObjectTitle,
                          {
                            color: viewTheme.color.helpText,
                          },
                        ]}>
                        {linkObject.title}
                      </Text>
                    </View>
                  ) : null}
                  {linkObject.description ? (
                    <View style={style.previewDescStyle}>
                      <Text
                        style={[
                          style.linkObjectDescription,
                          {
                            color: viewTheme.color.helpText,
                          },
                        ]}>
                        {linkObject.description}
                      </Text>
                    </View>
                  ) : null}
                  <View style={style.previewTextStyle}>
                    <Autolink
                      text={message.text}
                      style={{
                        color: viewTheme.color.helpText,
                        textAlign: 'center',
                      }}
                      textProps={{ selectable: true }}
                      linkProps={{ suppressHighlighting: true }}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={style.previewLinkStyle}
                  onPress={() => Linking.openURL(linkObject.url)}>
                  <Text
                    style={{ color: viewTheme.color.blue, fontWeight: '700' }}
                    numberOfLines={1}>
                    {linkText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      }
    }
  }

  const handleGo = () => {
    if (message.metadata.post !== undefined) {
      let id = message.metadata.post.id;

      RootNavigation.navigate('PostDetail', {id});
    }
  }

  const handleUrl = () => {
    Linking.openURL(message.metadata.post.link);
  }

  return (
    <View style={style.container}>
      <View style={style.innerContainer}>
        {props.message.receiverType === CometChat.RECEIVER_TYPE.GROUP ? (
          <View style={style.avatarStyle}>
            <CometChatAvatar
              cornerRadius={18}
              borderColor={viewTheme.color.secondary}
              borderWidth={0}
              image={senderAvatar}
              name={message.sender.name}
            />
          </View>
        ) : null}
        <View>
          {props.message.receiverType === CometChat.RECEIVER_TYPE.GROUP ? (
            <View style={style.senderNameStyle}>
              <Text style={{ color: props.theme.color.helpText }}>
                {message.sender.name}
              </Text>
            </View>
          ) : null}
          <View style={style.messageContainer}>
            <TouchableWithoutFeedback
              onPress={handleGo}
              onLongPress={() => {
                props.actionGenerated(actions.OPEN_MESSAGE_ACTIONS, message);
              }}>
              {message.metadata.post !== undefined ? <View
                style={[
                  style.postWrapperStyle,
                  {
                    backgroundColor: ViewTheme.backgroundColor.grey,
                  },
                ]}>
                {messageText}
                <View>
                  {message.metadata.post.post_attachments.length === 0 ? <View>
                  </View> : <View>
                    <FastImage
                      style={[{height: Size(5), width: Size(8), marginTop: 10, marginBottom: 10}]}
                      source={{uri: ASSET_BASE_URL + message.metadata.post.post_attachments[0].path}}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>}
                  {
                    message.metadata.post.post_type === 'link' ? <TouchableOpacity onPress={handleUrl}>
                      <Text style={[{color: 'black', textAlign: 'center'}]}>{message.metadata.post.post_type === 'link' ? message.metadata.post.link : message.metadata.post.description}</Text>
                    </TouchableOpacity> : <Text style={[{color: 'black', textAlign: 'center'}]}>{message.metadata.post.post_type === 'link' ? message.metadata.post.link : message.metadata.post.description}</Text>
                  }
                </View>
              </View> : <View
                style={[
                  style.messageWrapperStyle,
                  {
                    backgroundColor: ViewTheme.backgroundColor.grey,
                  },
                ]}>
                {messageText}
              </View>}
            </TouchableWithoutFeedback>
          </View>
          <View style={[style.containerStyle]}>
            <View style={[style.messageInfoWrapperStyle]}>
              <CometChatReadReceipt {...props} message={message} />

              <CometChatThreadedMessageReplyCount
                {...props}
                message={message}
              />
              <CometChatMessageReactions
                theme={props.theme}
                {...props}
                message={message}
                showMessage={props?.showMessage}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CometChatReceiverTextMessageBubble;
