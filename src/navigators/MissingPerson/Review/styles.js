import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    thumbnail: {
        width: '100%',
        height: Size(13),
        borderRadius: Size(),
    },
    badge: {
        width: Size(1.2),
        height: Size(1.5),
        top: Size(.5),
        right: Size(1)
    },
    missingDays: {
        bottom: 0,
        right: 0,
        borderTopLeftRadius: Size(),
        paddingHorizontal: Size(.7),
        paddingVertical: Size(.2)
    },
    divider: {
        marginTop: Size(0.5),
        backgroundColor: Colors.divider
    },
    settingImg: {
        width: Size(.3),
        height: Size(1.6),
    },
    dotSymbol: {
        width: Size(1.5),
    },
    contactImg: {
        width: Size(),
        height: Size()
    },
    selfCenter: {
        alignSelf: 'center'
    },
    bottom_divider: {
        marginHorizontal: Size(0.2),
        marginVertical: Size(1)
    },
});

export default styles;
