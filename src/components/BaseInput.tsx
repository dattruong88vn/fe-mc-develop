import { Input } from 'antd';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React from 'react';
import BaseText from './BaseText';

interface Props {
  placeholder?: string;
  handleChange: (value: string) => void;
  value?: string;
  type?: string;
  leftIcon?: string;
  maxLength?: number | undefined;
  textError?: string;
  disabled?: boolean;
  className?: string;
  isClosed?: () => void;
  rightIconImg?: string;
  refInput?: any;
}

export default function BaseInput(props: Props) {
  const {
    placeholder,
    handleChange,
    value,
    type,
    leftIcon,
    maxLength,
    textError,
    disabled,
    className,
    isClosed,
    rightIconImg,
    refInput
  } = props;

  return (
    <>
      <Input
        ref={refInput}
        size="large"
        placeholder={placeholder ?? ''}
        prefix={<img src={leftIcon ?? images.phone} />}
        style={{
          ...styles.input,
          border: `1px solid ${
            textError ? colors.redFF0000 : colors.border9EAABB
          }`
        }}
        onChange={(e) => handleChange(e.target.value)}
        value={value}
        type={type ?? 'text'}
        className={className}
        maxLength={maxLength ?? undefined}
        disabled={disabled}
        allowClear={{
          clearIcon: (
            <img onClick={isClosed} src={rightIconImg ?? images.iconBack} />
          )
        }}
      />
      <BaseText
        content={`${textError}`}
        textContainerStyle={styles.textError}
      />
    </>
  );
}

const styles = {
  input: {
    borderRadius: sizes._10sdp,
    height: sizes._50sdp,
    caretColor: colors.mainBlue
  },
  textError: {
    color: colors.redFF0000,
    marginTop: sizes._16sdp,
    fontSize: sizes._17sdp,
    display: 'block'
  }
};
