import colors from 'configs/res/colors';
import sizes from 'configs/res/sizes';
import { StylesDictionary } from 'utils/Utils';

const styles: StylesDictionary = {
  wrapper: {
    width: '100%',
    background: colors.white
  },
  title: {
    fontSize: sizes._17sdp,
    color: colors.black0A2851,
    fontWeight: 700,
    display: 'block',
    marginTop: sizes._10sdp,
    textAlign: 'center'
  },
  noticeWrapper: {
    width: '100%',
    padding: `${sizes._16sdp}px ${sizes._20sdp}px`,
    display: 'flex',
    alignItems: 'center',
    marginTop: sizes._10sdp,
    background: colors.colorHeader
  },
  textNoti: {
    fontSize: sizes._15sdp,
    color: colors.text536885,
    marginLeft: sizes._20sdp
  },
  titleId: {
    fontSize: sizes._13sdp,
    color: colors.black0A2851,
    fontWeight: 700,
    display: 'block',
    marginLeft: sizes._18sdp,
    marginTop: sizes._16sdp
  },
  infoFrame: {
    width: '100%',
    padding: `${sizes._12sdp}px ${sizes._18sdp}px`
  },
  noticeBoard: {
    width: '100%',
    background: colors.colorHeader,
    borderRadius: sizes._18sdp,
    padding: `${sizes._24sdp}px ${sizes._18sdp}px`
  },
  imgWrapper: {
    width: '100%',
    padding: `${sizes._20sdp}px ${sizes._24sdp}px`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: colors.colorHeader,
    marginTop: sizes._24sdp
  },
  imgFrame: {
    width: sizes._82sdp,
    height: sizes._52sdp,
    borderRadius: sizes._8sdp,
    background: 'pink',
    position: 'relative'
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: sizes._8sdp
  },
  reportError: {
    fontSize: sizes._17sdp,
    color: colors.mainBlue,
    marginLeft: sizes._11sdp
  },
  reportWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: `${sizes._18sdp}px`
  },
  divide: {
    width: '100%',
    height: sizes._16sdp,
    background: colors.colorHeader
  },
  tryAgainBtn: {
    width: sizes._184sdp,
    height: sizes._56sdp,
    background: colors.greyDCDCDC
  },
  confirmBtn: {
    width: sizes._184sdp,
    height: sizes._56sdp,
    background: colors.mainBlue
  },
  tryAgainTxt: {
    color: colors.black0A2851,
    fontWeight: 600
  },
  confirmTxt: {
    color: colors.white,
    fontWeight: 600
  }
};

export default styles;
