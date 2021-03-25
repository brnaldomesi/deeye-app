import { FlatList } from 'react-native';
import React from 'react';

export default function VirtualizedView(props: any) {
  return (
    <FlatList
      data={[]}
      keyboardShouldPersistTaps={'handled'}
      ListEmptyComponent={null}
      keyExtractor={(item, index) => index.toString()}
      renderItem={null}
      ListHeaderComponent={() => (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    />
  );
}
