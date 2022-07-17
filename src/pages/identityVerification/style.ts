import colors from 'configs/res/colors';
import sizes from 'configs/res/sizes';
import { StylesDictionary } from 'utils/Utils';

export const styles: StylesDictionary = {
  container: {
    backgroundColor: colors.white
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    paddingTop: sizes._24sdp,
    flexDirection: 'column'
  },

  avatarStyle: {
    width: sizes._96sdp,
    height: sizes._96sdp
  },

  textContainerStyle: {
    fontSize: sizes._18sdp,
    paddingTop: sizes._10sdp,
    fontWeight: '600',
    display: 'block'
  },

  phoneStyle: {
    fontSize: sizes._15sdp,
    paddingTop: sizes._6sdp,
    fontWeight: '400',
    color: colors.gray7A8AA2
  },

  viewIdentity: {
    width: '90%',
    height: sizes._174sdp,
    backgroundColor: colors.blueRGBAA73F0,
    borderRadius: sizes._8sdp,
    margin: 'auto',
    marginTop: sizes._30sdp,
    padding: sizes._16sdp
  },

  wrapperFlexRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  buttonContainer: {
    height: sizes._35sdp,
    backgroundColor: 'transparent',
    paddingRight: sizes._5sdp,
    border: 'none',
    boxShadow: 'none'
  },

  identityStyle: {
    fontSize: sizes._16sdp,
    fontWeight: '600'
  },

  searchTextStyle: {
    color: colors.blue0A73F0
  },

  lineStyle: {
    width: '100%',
    height: sizes._2sdp,
    backgroundColor: colors.white,
    marginTop: sizes._10sdp
  },

  wrapperContent: {
    marginTop: sizes._10sdp,
    alignItems: 'flex-start'
  },

  iconSearch: {
    width: sizes._50sdp,
    height: sizes._50sdp
  },

  wrapperText: {
    display: 'block',
    marginLeft: sizes._20sdp
  },

  contentStyle: {
    fontSize: sizes._16sdp,
    fontWeight: '300',
    color: colors.black0A2851,
    paddingTop: sizes._5sdp
  },

  buttonStyle: {
    width: '90%',
    height: sizes._56sdp,
    margin: 'auto',
    marginTop: sizes._200sdp
  },

  textButton: {
    fontSize: sizes._18sdp,
    fontWeight: '600',
    color: colors.white
  }
};
