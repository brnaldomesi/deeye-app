import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';

export default class StyleSheetFactory {
  static getSheet(aspectRatio) {
    return StyleSheet.create({
      iconImage: {
        width: Size(2),
        aspectRatio: aspectRatio
      }
    })
  }
}