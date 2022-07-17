import BaseResult from 'components/BaseResult';
import images from 'configs/res/images';
import strings from 'configs/res/strings';
import React from 'react';

export default function RegisterFailScreen() {
  return (
    <>
      <BaseResult
        img={images.registerSuccess}
        title={strings.authen.registerSuccess}
      />
    </>
  );
}
