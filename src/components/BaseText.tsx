import colors from 'configs/res/colors';
import sizes from 'configs/res/sizes';
import React, { CSSProperties, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<any> {
  content: string | number;
  textContainerStyle?: CSSProperties;
  handleClick?: () => void;
}

export default function BaseText(props: Props) {
  const { content, textContainerStyle, handleClick, ...restProps } = props;
  return (
    <span
      style={{
        ...containerStyle,
        ...textContainerStyle
      }}
      onClick={handleClick}
      {...restProps}
    >
      {content}
    </span>
  );
}

const containerStyle: CSSProperties = {
  fontFamily: 'SF UI Display Medium',
  fontSize: sizes._14sdp,
  color: colors.blackDefaultText
};
