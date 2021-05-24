import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { justifyBetween } from '../../styles';

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
    backgroundColor: '#05174f',
  },

  middle: {
    backgroundColor: '#05174f',
  },

  footer: {
    marginTop: 20,
    backgroundColor: '#05174f',
  },

  primaryColor: {
    color: '#05174f'
  },

  whiteColor: {
    color: '#FFFFFF'
  },

  miss: {
    marginLeft: 10,
    marginRight: 10,
    borderTopWidth: 1,
    borderTopColor: 'grey',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },

  since: {
    paddingRight: 5,
    borderRightWidth: 3,
    borderRightColor: 'grey'
  },

  from: {
    marginLeft: 5
  },

  detail: {
    marginTop: -20,
    paddingBottom: 10,
  },  

  circumstace: {
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: 'grey'
  },

  phone: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  ph1: {
    left: 5,
    alignSelf: 'flex-start',
  },

  ph2: {
    right: 5,
    alignSelf: 'flex-end',
  },

  footer_tap: {
    backgroundColor: '#05174f',
    position: 'absolute',
    bottom: 55,
    height: 25,
    display:'flex',
    justifyContent: 'center',
    right: 10,
    left: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  
  footer_title: {
    margin: 'auto',
    fontSize: Size(.7),
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center'
  },

  top_tap: {
    zIndex: 100,
    position: 'absolute',
    top: 92.5,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ed8829',
    alignSelf: 'center',
    height: 20,
    width: '80%',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center'
  },

  top_description: {
    color: 'white',
    fontSize: Size(0.9)
  },

  top_arrow: {
    marginLeft: 5,
    height: 15,
    width: 15
  },

  top_img1: {
    marginLeft: 5,
    height: 15,
    width: 40
  },

  top_img2: {
    marginLeft: 5,
    height: 15,
    width: 40
  },

  avatar: {
    zIndex: 100,
    position: 'absolute',
    top: -360,
    right: -5,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    height: 50,
    width: 50,
    borderRadius: 50
  },
  
  avatar_position: {
    alignSelf: 'center',
    height: 0,
    position: 'absolute',
    width: '100%'
  },

  cirText: {
    paddingTop: 6,
    color: 'gray',
    fontSize: Size(.9),
  },

  btnSkip: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: 'white',
    backgroundColor: '#ffffff50',
    borderRadius: 20,
    marginTop: 10,
    marginRight: 5,
  },

  headerTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: Size(3.5),
  },

  headerUnderTitle: {
    marginTop: -10,
    color: 'white',
    textAlign: 'center',
    fontSize: Size(1.5),
  },

  middleTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: Size(1.5),
  },

  middleUnderTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: Size(.9),
  },

  mb1: {
    marginBottom: 10,
  },

  centerImg: {
    width: Size(2),
    height: Size(2),
  },

  grow1: {
    flexGrow: 1,
    flexShrink: 1
  },

  hp1: {
    paddingHorizontal: 10
  },

  hr1: {
    paddingRight: 10
  },

  mr1: {
    marginRight: 10
  },

  verifyImg: {
    width: Size(1),
    height: Size(1),
    resizeMode: 'contain'
  },

  verifyText: {
    fontSize: Size(.6),
    color: 'green'
  },

  vp1: {
    paddingVertical: 10
  },

  yellowColor: {
    color: '#ed8829'
  },

  wr1: {
    width: Size(2),
  },

  flexShrink: {
    flexShrink: 1,
  }

});

export default styles;
