import colors from 'configs/res/colors';
import sizes from 'configs/res/sizes';
import React, { CSSProperties } from 'react';
import { StylesDictionary } from 'utils/Utils';

export const styles: StylesDictionary = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'column'
  },
  wrapperHeader: {
    alignItems: 'center'
  },
  imageLogo: {
    marginBlock: sizes._15sdp
  },
  border: {
    width: '100%',
    height: 1,
    backgroundColor: colors.greyC6CBD4
  },
  wrapper: {
    width: '100%',
    background: colors.white,
    padding: `0px ${sizes._18sdp}px`
  },
  titleId: {
    fontSize: sizes._20sdp,
    color: colors.black0A2851,
    fontWeight: 700,
    display: 'block',
    marginTop: sizes._16sdp
  },
  content: {
    display: 'block',
    fontSize: sizes._17sdp,
    fontWeight: 400,
    color: '#0B192D',
    opacity: 0.7,
    paddingTop: sizes._16sdp
  },
  img: {
    marginTop: sizes._30sdp,
    display: 'flex',
    justifyContent: 'center'
  },
  intro3: {
    marginTop: sizes._70sdp,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ekyc_block: {
    width: sizes._28sdp,
    height: sizes._28sdp,
    marginTop: sizes._16sdp,
    marginRight: sizes._16sdp
  },
  br: {
    width: '100%',
    height: 1,
    margin: `${sizes._45sdp}px 0px ${sizes._15sdp}px 0px`,
    background: colors.black0A2851,
    opacity: 0.1
  },
  buttonEndWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  saveAndExit: {
    fontSize: sizes._17sdp,
    fontWeight: 600,
    color: colors.mainBlue,
    marginTop: sizes._33sdp,
    marginLeft: sizes._18sdp,
    marginRight: sizes._18sdp,
    height: sizes._60sdp,
    width: '100%'
  },
  btnConfirm: {
    marginTop: sizes._16sdp,
    marginRight: sizes._18sdp,
    height: sizes._60sdp,
    width: '100%',
    border: '1px solid #E7E9F2',
    boxSizing: 'border-box',
    borderRadius: sizes._8sdp,
    backgroundColor: '#3383F9'
  },
  cancelText: {
    fontSize: sizes._17sdp,
    fontWeight: 400,
    color: 'white'
  }
};

export const container: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};
export const viewText: CSSProperties = {
  display: 'flex',
  width: sizes._414sdp,
  backgroundColor: colors.blackWithOpacity(0.6),
  height: sizes._50sdp,
  position: 'absolute',
  top: 0,
  zIndex: 100,
  justifyContent: 'center',
  alignItems: 'center'
};
export const textStyle: CSSProperties = {
  fontSize: sizes._20sdp,
  color: colors.white,
  fontWeight: '600'
};
export const wrapperBottom: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  bottom: 0
};
export const wrapperImage: CSSProperties = {
  display: 'flex',
  width: sizes._100sdp,
  height: sizes._100sdp,
  borderRadius: sizes._60sdp,
  backgroundColor: '#EAEEF9',
  marginBottom: sizes._20sdp,
  alignItems: 'center',
  justifyContent: 'center'
};

export const image: CSSProperties = {
  width: sizes._85sdp,
  height: sizes._85sdp
};

export const textContainerStyle: CSSProperties = {
  fontSize: sizes._16sdp,
  fontWeight: '400'
};

export const webcamStyle: CSSProperties = {
  position: 'absolute',
  left: '50%',
  marginLeft: '-50%',
  objectFit: 'cover',
  objectPosition: 'center'
};

export const btnWrapper: CSSProperties = {
  marginTop: sizes._10sdp,
  marginBottom: sizes._50sdp,
  width: '80%'
};

export const btnConfirm: CSSProperties = {
  marginTop: sizes._16sdp,
  marginRight: sizes._18sdp,
  height: sizes._40sdp,
  width: '100%',
  border: '1px solid #E7E9F2',
  boxSizing: 'border-box',
  borderRadius: sizes._8sdp,
  backgroundColor: '#3383F9'
};

export const cancelText: CSSProperties = {
  fontSize: sizes._16sdp,
  fontWeight: 400,
  color: 'white'
};

export const quitStyle: CSSProperties = {
  color: colors.white,
  fontSize: sizes._16sdp,
  fontWeight: '500',
  position: 'absolute',
  right: sizes._24sdp
};
