import { CometChatAvatar, CometChatUserPresence } from '../../Shared';
import { Text, TouchableHighlight, View } from 'react-native';
import { justifyBetween, textGreen1 } from 'src/styles';

import { Button } from 'react-native-elements';
import PopupMenu from './components/PopupMenu';
import React from 'react';
import { Row } from 'react-native-col';
import style from './styles';
import theme from '../../../resources/theme';

export default (props) => {
  const ViewTheme = { ...theme, ...props.theme };
  const status = props.user.status;

  return (
    <TouchableHighlight
      onPress={() => props.clickeHandler(props.user)}
      underlayColor={ViewTheme.backgroundColor.listUnderlayColor}>
      <View style={[style.listItem, justifyBetween]}>
        <Row>
          <View style={[style.avatarStyle, { borderRadius: 22 }]}>
            <CometChatAvatar
              image={{ uri: props.user.avatar }}
              cornerRadius={22}
              borderColor={ViewTheme.color.secondary}
              borderWidth={0}
              name={props.user.name}
            />
            <CometChatUserPresence
              widgetsettings={props.widgetsettings}
              status={props.user.status}
              cornerRadius={18}
              borderColor={ViewTheme.color.darkSecondary}
              borderWidth={1}
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
