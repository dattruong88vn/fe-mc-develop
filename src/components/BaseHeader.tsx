import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { CSSProperties } from 'react';
import { useHistory } from 'react-router-dom';

function BaseHeader() {
  const history = useHistory();

  const onClickBack = () => {
    history.goBack();
  };

  return (
    <div style={container}>
      <Button style={buttonStyle} onClick={onClickBack}>
        <ArrowLeftOutlined style={arrowStyle} />
      </Button>

      <div style={wrapperLogo}>
        <Image src={images.logo_mc} preview={false} />
        <Image src={images.logo_9pay} preview={false} />
      </div>
    </div>
  );
}

const container: CSSProperties = {
  width: '100%',
  height: sizes._55sdp,
  flexDirection: 'row',
  backgroundColor: colors.colorHeader,
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex'
};
const buttonStyle: CSSProperties = {
  border: 0,
  backgroundColor: colors.colorHeader,
  boxShadow: 'none'
};
const arrowStyle: CSSProperties = {
  color: colors.black
};
const wrapperLogo: CSSProperties = {
  width: '30%',
  flexDirection: 'row',
  alignItems: 'center',
  display: 'flex',
  marginRight: sizes._10sdp,
  justifyContent: 'space-evenly'
};

export default BaseHeader;
