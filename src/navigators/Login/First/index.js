import { Divider } from 'react-native-elements';
import IconButton from 'src/components/IconButton';
import React from 'react';
import { View } from 'react-native';
import { basicPadding } from 'src/styles';
import styles from './styles';

const First = ({ navigation }) => {
  const handlePress = type => () => {
    navigation.navigate(type) 
  }

  return (
    <View style={basicPadding}>
      {/* <IconButton 
        onPress={handlePress('Email')}
        text='Gmail'
        imageName="gmail"
        aspectRatio={21/16}
      />
      <Divider 
        style={styles.divider} 
      />
      <IconButton 
        onPress={handlePress('Email')}
        text='Facebook'
        imageName="facebook"
        aspectRatio={1}
      />
      <Divider 
        style={styles.divider} 
      />
      <IconButton 
        onPress={handlePress('Email')}
        text='Instagram'
        imageName="instagram"
        aspectRatio={1}
      />
      <Divider 
        style={styles.divider} 
      />
      <IconButton 
        onPress={handlePress('Email')}
        text='Yahoo Mail'
        imageName="yahoo"
        aspectRatio={35/36}
      />
      <Divider 
        style={styles.divider} 
      /> */}
      <IconButton 
        onPress={handlePress('Email')}
        text='Email Address'
        imageName="email"
        aspectRatio={144/115}
      />
      <Divider 
        style={styles.divider} 
      />
      {/* <IconButton 
        onPress={handlePress('Phone')}
        text='Phone number'
        imageName="phone"
        aspectRatio={7/11}
      /> */}
    </View>
  );
};

export default First;
