import colors from 'configs/res/colors';
import sizes from 'configs/res/sizes';
import { StylesDictionary } from 'utils/Utils';

const styles: StylesDictionary = {
  avatarWrapper: {
    width: sizes._56sdp,
    height: sizes._56sdp,
    background: colors.blurblue2,
    borderRadius: sizes._28sdp,
    marginRight: sizes._16sdp,
    position: 'relative'
  },
  genderIcon: {
    right: 0,
    bottom: 0,
    width: sizes._14sdp,
    height: sizes._14sdp,
    position: 'absolute'
  },
  avatar: {
    borderRadius: '50%',
    width: sizes._56sdp,
    height: sizes._56sdp
  },
  name: {
    fontSize: sizes._16sdp,
    fontWeight: 600,
    color: colors.black0A2851
  },
  line: {
    display: 'flex',
    marginTop: sizes._8sdp,
    alignItems: 'center'
  },
  icon: {
    width: sizes._14sdp,
    display: 'flex',
    justifyContent: 'center'
  },
  personalInfo: {
    fontSize: sizes._13sdp,
    opacity: 0.5,
    color: colors.black0A2851,
    display: 'block',
    marginLeft: sizes._10sdp
  },
  title: {
    fontSize: sizes._11sdp,
    fontWeight: 700,
    color: colors.black0A2851,
    opacity: 0.5
  },
  noticeBoard: {
    width: '100%',
    background: colors.white,
    borderRadius: sizes._16sdp,
    padding: `${sizes._22sdp}px ${sizes._18sdp}px`,
    marginBottom: sizes._14sdp,
    marginTop: sizes._12sdp
  },
  tryAgainBtn: {
    width: '40%',
    height: sizes._54sdp,
    background: colors.greyDCDCDC
  },
  confirmBtn: {
    width: '57%',
    height: sizes._54sdp,
    background: colors.mainBlue
  },
  tryAgainTxt: {
    color: colors.black0A2851,
    fontWeight: 600
  },
  confirmTxt: {
    color: colors.white,
    fontWeight: 600
  },
  titleFrame: {
    padding: `${sizes._10sdp}px 0`,
    width: '100%',
    background: colors.white
  },
  titleText: {
    fontSize: sizes._15sdp,
    fontWeight: 700,
    color: colors.black0A2851,
    display: 'block',
    textAlign: 'center'
  },
  wrapper: {
    width: '100%',
    padding: sizes._18sdp,
    background: colors.blurblue
  },
  customerInfoFrame: {
    padding: sizes._23sdp,
    width: '100%',
    background: colors.white,
    borderRadius: sizes._14sdp,
    display: 'flex',
    marginTop: sizes._12sdp,
    marginBottom: sizes._10sdp
  },
  viewDetailFrame: {
    width: '100%',
    padding: sizes._24sdp,
    background: colors.white,
    borderRadius: sizes._14sdp,
    display: 'flex',
    alignItems: 'center'
  },
  viewDetail: {
    fontSize: sizes._15sdp,
    color: colors.black0A2851,
    marginLeft: sizes._22sdp
  },
  actionFrame: {
    width: '100%',
    padding: `${sizes._20sdp}px ${sizes._22sdp}px ${sizes._42sdp}px ${sizes._26sdp}px`,
    background: colors.white
  },
  conditionFrame: {
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  uncheck: {
    width: sizes._27sdp,
    height: sizes._24sdp,
    border: `2px solid ${colors.mainBlue}`,
    borderRadius: sizes._4sdp,
    marginRight: sizes._18sdp
  },
  groupBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  conditionWrapper: {
    width: '100%',
    marginBottom: sizes._26sdp,
    paddingTop: sizes._20sdp
  },
  agree2: {
    fontSize: sizes._13sdp,
    color: colors.mainBlue
  }
};

export default styles;
