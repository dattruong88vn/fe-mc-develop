import colors from 'configs/res/colors';
import sizes from 'configs/res/sizes';
import { StylesDictionary } from 'utils/Utils';

export const styles: StylesDictionary = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  wrapperWebCam: {
    position: 'relative',
    width: '100%',
    zIndex: 1,
    marginTop: sizes._35sdp
  },
  webcamStyle: {
    position: 'absolute',
    left: '50%',
    marginLeft: '-50%',
    objectFit: 'cover',
    objectPosition: 'center'
  },
  title: {
    color: colors.black0A2851,
    fontSize: sizes._18sdp,
    fontWeight: '700',
    paddingTop: sizes._15sdp
  },
  quitStyle: {
    color: colors.black0A2851,
    fontSize: sizes._16sdp,
    fontWeight: 600,
    position: 'absolute',
    right: sizes._24sdp
  },
  titleCCCD: {
    color: '#0A2851',
    fontWeight: 400,
    fontSize: sizes._16sdp,
    paddingTop: sizes._18sdp
  },
  wrapperFlexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: sizes._30sdp
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    width: sizes._4sdp,
    height: sizes._4sdp,
    backgroundColor: colors.grayD6D9E0,
    borderRadius: sizes._3sdp,
    marginLeft: sizes._7sdp,
    position: 'relative',
    bottom: sizes._42sdp
  },
  fontStyle: {
    fontSize: sizes._13sdp,
    fontWeight: '400',
    display: 'block',
    textAlign: 'center'
  },

  backStyle: {
    color: colors.border9EAABB,
    paddingLeft: sizes._5sdp
  },

  frameStyle: {
    width: sizes._380sdp,
    height: sizes._230sdp,
    position: 'absolute',
    top: window.screen.height <= 667 ? sizes._40sdp : sizes._70sdp,
    left: sizes._17sdp,
    zIndex: 100
  },
  wrapperCapture: {
    width: sizes._80sdp,
    height: sizes._80sdp,
    borderRadius: sizes._40sdp,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: sizes._100sdp,
    left: sizes._167sdp,
    border: 0,
    boxShadow: 'none',
    padding: 0,
    zIndex: 200,
    transform:
      window.screen.height <= 667
        ? `translateY(${sizes._50sdp}px)`
        : `translateY(0px)`
  },
  iconCapture: {
    width: sizes._70sdp,
    height: sizes._70sdp
  },

  wrapperFlash: {
    width: sizes._60sdp,
    height: sizes._60sdp,
    borderRadius: sizes._30sdp,
    left: sizes._300sdp,
    top: sizes._410sdp,
    zIndex: 200
  },

  iconFlash: {
    width: sizes._60sdp,
    height: sizes._60sdp
  },

  captureStyle: {
    marginTop: window.screen.height <= 667 ? sizes._20sdp : sizes._40sdp,
    width: sizes._364sdp,
    height: sizes._230sdp,
    borderRadius: sizes._25sdp
  },

  wrapperButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    bottom: sizes._90sdp,
    left: '50%',
    transform: `translateX(-50%) ${
      window.screen.height <= 667
        ? `translateY(${sizes._50sdp}px)`
        : `translateY(0px)`
    }`
  },

  buttonContainer: {
    width: sizes._340sdp,
    height: sizes._50sdp,
    marginTop: sizes._20sdp
  },

  buttonLeft: {
    backgroundColor: colors.grayD6D9E0
  },
  textButton: {
    color: colors.white,
    fontSize: sizes._18sdp,
    fontWeight: '600'
  }
};
