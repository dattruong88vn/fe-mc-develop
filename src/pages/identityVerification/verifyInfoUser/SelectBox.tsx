import vi from 'assets/languages/vi';
import BaseText from 'components/BaseText';
import { LocationObj } from 'components/modals/SelectModal';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { CSSProperties } from 'react';

interface SelectBoxProps {
  title: string;
  width?: string | number;
  styles?: CSSProperties;
  handleClick?: () => void;
  isInput?: boolean;
  handleChangeAddr?: (text: string) => void;
  fullAddr?: string;
  isValidate?: boolean;
  valueSelect?: LocationObj | null;
}

export default function SelectBox(props: SelectBoxProps) {
  const {
    title,
    width,
    styles,
    handleClick,
    isInput,
    handleChangeAddr,
    fullAddr,
    isValidate,
    valueSelect
  } = props;
  return (
    <>
      {isInput ? (
        <div
          style={{ width: width ?? '48%', marginTop: sizes._16sdp, ...styles }}
        >
          <BaseText content={title} textContainerStyle={commonStyles.title} />
          <div
            style={{
              ...commonStyles.inputWrapper,
              border: `1px solid ${
                isValidate && !fullAddr ? colors.redFF0000 : colors.border9EAABB
              }`
            }}
          >
            <input
              type="text"
              placeholder={vi.identityVerification.inputFullAddress}
              style={commonStyles.input}
              onChange={(e) =>
                handleChangeAddr && handleChangeAddr(e.target.value)
              }
              value={fullAddr}
            />
            <div style={commonStyles.close}>
              <img
                src={images.close}
                onClick={() => handleChangeAddr && handleChangeAddr('')}
              />
            </div>
          </div>
          {isValidate && !fullAddr && (
            <BaseText
              content={vi.authen.notEmpty}
              textContainerStyle={commonStyles.notEmpty}
            />
          )}
        </div>
      ) : (
        <div
          style={{ width: width ?? '48%', marginTop: sizes._16sdp, ...styles }}
          onClick={() => handleClick && handleClick()}
        >
          <BaseText content={title} textContainerStyle={commonStyles.title} />
          <div
            style={{
              ...commonStyles.inputWrapper,
              border: `1px solid ${
                isValidate && !fullAddr ? colors.redFF0000 : colors.border9EAABB
              }`
            }}
          >
            <BaseText
              content={valueSelect ? valueSelect.name : 'Vui lòng chọn'}
              textContainerStyle={commonStyles.valueSelect}
            />
            <img src={images.arrowDown} />
          </div>
        </div>
      )}
    </>
  );
}

const commonStyles = {
  title: {
    fontSize: sizes._13sdp,
    color: colors.black0A2851,
    fontWeight: 700,
    opacity: 0.5
  },
  inputWrapper: {
    width: '100%',
    height: sizes._54sdp,
    borderRadius: sizes._10sdp,
    marginTop: sizes._4sdp,
    padding: `0 ${sizes._18sdp}px`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    border: 'none',
    background: colors.transparent,
    width: sizes._300sdp,
    caretColor: colors.mainBlue
  },
  close: {
    width: sizes._20sdp,
    height: sizes._20sdp,
    background: colors.blackMainWithOpacity(0.2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizes._10sdp
  },
  notEmpty: {
    fontSize: sizes._13sdp,
    color: colors.redFF0000,
    marginTop: sizes._4sdp
  },
  valueSelect: {
    fontSize: sizes._17sdp,
    color: colors.black0A2851
  }
};
