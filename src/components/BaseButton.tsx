import { Button, Image } from 'antd';
import sizes from 'configs/res/sizes';
import React, { CSSProperties } from 'react';
import BaseText from './BaseText';

interface Props {
  title: string;
  icon?: string;
  buttonContainer?: CSSProperties;
  iconContainerStyle?: CSSProperties;
  textContainerStyle?: CSSProperties;
  onClick: () => void;
  disabled?: boolean;
}

export default function BaseButton(props: Props) {
  const {
    title,
    icon,
    buttonContainer,
    iconContainerStyle,
    textContainerStyle,
    onClick,
    disabled
  } = props;
  return (
    <Button
      style={{ ...singleButton, ...buttonContainer }}
      onClick={onClick}
      disabled={disabled}
    >
      <BaseText content={title} textContainerStyle={textContainerStyle} />
      {icon ? (
        <Image
          src={icon}
          style={{ ...iconStyle, ...iconContainerStyle }}
          preview={false}
        />
      ) : null}
    </Button>
  );
}

const singleButton: CSSProperties = {
  display: 'block',
  borderRadius: 10,
  height: sizes._45sdp,
  backgroundColor: '#0A73F0',
  paddingLeft: sizes._10sdp,
  paddingRight: sizes._10sdp
};

const iconStyle: CSSProperties = {
  width: sizes._20sdp,
  height: sizes._20sdp,
  position: 'relative',
  top: sizes._5sdp,
  left: sizes._7sdp
};
