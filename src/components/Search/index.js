import React from 'react';
import { View, Text, SafeAreaView, TextInput } from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Search = () => {
  return (
    <View>
      <Text style={styles.text}>DeEye</Text>
      <View style={styles.feed}>
        <View style={styles.feedImgCorner}>
          <Avatar
            size="medium"
            rounded
            source={require('src/assets/images/Ellipse-1.png')}
            containerStyle={{borderWidth: 2, borderColor: '#05174f', marginTop: 5, width: 40, height: 40}}
          />
        </View>
        <SafeAreaView style={styles.inputCorner}>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
          />
        </SafeAreaView>
        <View style={styles.searchCorner}>
          <Icon name="search" color="#05174f" size={32} onPress={() => console.log("")}/>
        </View>
      </View>
    </View>
  );
}

export default Search;