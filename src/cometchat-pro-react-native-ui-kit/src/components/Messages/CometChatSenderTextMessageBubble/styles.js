import { StyleSheet } from 'react-native';
import { heightRatio, widthRatio } from '../../../utils/consts';

export default StyleSheet.create({
  container: { marginBottom: 16, marginRight: 8 },
  linkTitle: { fontWeight: '700' },
  linkDescription: {
    fontStyle: 'italic',
    fontSize: 13,
  },
  autoLinkStyle: { color: 'white', fontSize: 15 },
  previewAutoLinkStyle: { textAlign: 'center' },
  linkStyle: { textDecorationLine: 'underline', fontSize: 15 },
  linkTextStyle: { fontWeight: '700' },
  postWrapperStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    marginBottom: 4,
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12 * widthRatio,
    paddingVertical: 8 * heightRatio,
    maxWidth: '100%',
    borderRadius: 12,
  },
  messageWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0ed4',

    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '65%',
    borderRadius: 10,
    marginBottom: 4,
  },
  messageInfoWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  messagePreviewContainerStyle: {
    borderRadius: 12,
    flex: 1,
  },
  previewImageStyle: {
    height: 150,
    marginVertical: 12,
  },
  previewImageIconStyle: {
    height: 50,
    marginVertical: 12,
  },
  previewDataStyle: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewTitleStyle: {
    flexWrap: 'wrap',
    textAlign: 'left',
    marginBottom: 8,
  },
  previewDescStyle: {
    textAlign: 'left',
    paddingVertical: 8,
  },
  previewTextStyle: {
    paddingHorizontal: 5,
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
  },
  previewLinkStyle: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
