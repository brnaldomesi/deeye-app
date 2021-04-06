import { Size } from 'src/styles';
import { StyleSheet } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: Size(4),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "nowrap",
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },
  icon: {
    alignSelf: 'flex-start',
    fontSize: Size(1.5),
    left: 38,
    top: 9
  },
  header_text: {
    alignSelf: 'flex-end',
    fontSize: Size(1.5),
    right: -85,
    top: -25
  },
  title: {
    marginTop: 20
  },
  title_header: {
    fontSize: Size(1.2),
    left: 40
  },
  title_footer: {
    paddingTop: 8,
    left: 40
  },
  content: {
    flexGrow: 1,
    marginTop: 40
  },
  radio: {
    display: 'flex',
    marginLeft: 30,
  },
  radio_btn: {
    alignSelf: 'flex-end'
  },
  radio_title: {
    alignSelf: 'flex-start',
    top: -28,
    left: 45
  },
  footer: {
    flexGrow: 1,
    marginTop: 60,
    marginBottom: 30
  },
  footer_content: {
    marginLeft: 40
  },
  footer_info: {
    marginLeft: 40,
    color: 'blue'
  },
  btn_container: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40
  },
  btn: {
    width: 200,
    height: 45,
    backgroundColor: 'grey',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  btn_text: {
    alignSelf: "center"
  },
  custom: {
    backfaceVisibility: 'hidden',
    backgroundColor: 'white'
  }
});

export default styles;
