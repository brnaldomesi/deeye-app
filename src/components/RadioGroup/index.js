import React, {useCallback, useEffect, useState} from 'react';
import { CheckBox } from 'react-native-elements';
import { View, Text } from 'react-native';
import styles from './styles';

const RadioGroup = ({onRadioItemPress, data}) => {
    const list = data;
    const [value, setValue] = useState(0);
    const handlePress = (index, data) => () => {
        setValue(index);
        onRadioItemPress(data);
    }

    return (
        <View style={styles.container}>
            {list.map((item, index) => (
                <CheckBox
                    containerStyle={styles.check}
                    key={index}
                    title={item.content}
                    value={index}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={value === index}
                    onPress={handlePress(index, item.content)}
                />
            ))}
        </View>
    );
}

export default RadioGroup;