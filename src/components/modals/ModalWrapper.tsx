import colors from 'configs/res/colors';
import sizes from 'configs/res/sizes';
import React, { CSSProperties, ReactNode, useEffect } from 'react';
import { StylesDictionary } from 'utils/Utils';

interface ModalWrapperProps {
  children: ReactNode;
  containerStyle: CSSProperties;
  isSlide?: boolean;
  bottom?: string;
}

export default function ModalWrapper(props: ModalWrapperProps) {
  const { children, containerStyle, isSlide, bottom } = props;

  useEffect(() => {
    const wrapper = document.getElementById('wrapper');
    if (wrapper) {
      isSlide
        ? (wrapper.style.bottom = `-${window.innerHeight}px`)
        : (wrapper.style.bottom = `${bottom ? bottom : '0px'}`);
    }
  }, [isSlide]);

  return (
    <div style={styles.screenWrapper}>
      <div
        id="wrapper"
        style={{
          ...styles.modalWrapper,
          ...containerStyle
        }}
      >
        {children}
      </div>
    </div>
  );
}

const styles: StylesDictionary = {
  screenWrapper: {
    background: colors.blackWithOpacity(0.5),
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 300
  },
  modalWrapper: {
    width: '100%',
    bottom: `-${window.innerHeight}px`,
    borderTopLeftRadius: sizes._5sdp,
    borderTopRightRadius: sizes._5sdp,
    overflow: 'hidden',
    transitionDuration: '0.4s',
    transitionProperty: 'all',
    position: 'fixed'
  }
};
