import { Colors, Size } from 'src/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between'
  },
  image: {
    marginTop: Size(6),
    width: '100%',
    height: undefined,
    aspectRatio: 1389/737
  },
  imageView: {
    flex: 7, 
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  heading: {
    fontSize: Size(1.7),
    color: Colors.button.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headingView: {
    justifyContent: 'center',
    flex: 2,
  },
  content: {
    color: Colors.button.primary,
    fontSize: Size(1.2),
    textAlign: 'center'
  },
  contentView: {
    flex: 2
  },
  roundNavigationView: {
    flex:3, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  nextButton: {
    marginBottom: Size(.5)
  }
});

export default styles;
