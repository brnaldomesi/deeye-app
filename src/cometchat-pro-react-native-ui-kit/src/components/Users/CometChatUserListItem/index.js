import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { CometChatUserPresence, CometChatAvatar } from '../../Shared';
import { Row } from 'react-native-col';
import PopupMenu from './components/PopupMenu';
import style from './styles';
import { justifyBetween, textGreen1 } from 'src/styles';
import theme from '../../../resources/theme';

const CometChatUserListItem = (props) => {
  const viewTheme = { ...theme, ...props.theme };
  const status = props.user.status;

  return (
    <TouchableHighlight
      onPress={() => props.clickHandler(props.user)}
      underlayColor={viewTheme.backgroundColor.listUnderlayColor}>
      <View style={[style.listItem, justifyBetween]}>
        <Row>
          <View style={[style.avatarStyle, { borderRadius: 22 }]}>
            <CometChatAvatar
              image={{ uri: props.user.avatar }}
              cornerRadius={22}
              borderColor={viewTheme.color.secondary}
              borderWidth={0}
              name={props.user.name}
            />
            <CometChatUserPresence
              status={props.user.status}
              cornerRadius={18}
              style={{ top: 30 }}
              borderColor={viewTheme.color.white}
              borderWidth={2}
            />
          </View>
          <View>
            <Row>
              <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold' }}>
                {props.user.name}
              </Text>
            </Row>
            <Text style={status === 'online' ? textGreen1 : undefined}>{status[0].toUpperCase() + status.slice(1)}</Text>
          </View>
        </Row>
        <PopupMenu />
      </View>
    </TouchableHighlight>
  );
};

export default CometChatUserListItem;
