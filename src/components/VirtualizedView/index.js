import { FlatList } from 'react-native';
import React from 'react';

const HeaderComponent = props => <React.Fragment>{props.component}</React.Fragment>

const VirtualizedView = props => {
  return (
    <FlatList
      data={[]}
      keyboardShouldPersistTaps={'handled'}
      ListEmptyComponent={null}
      keyExtractor={(item, index) => index.toString()}
      renderItem={null}
      ListHeaderComponent={<HeaderComponent component={props.children} />}
    />
  );
}

export default VirtualizedView;
