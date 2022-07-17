import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { useRef } from 'react';
import { StylesDictionary } from 'utils/Utils';
import { Button, Image } from 'antd';
import { Camera, CameraType } from 'react-camera-pro';
import strings from 'configs/res/strings';

interface Props {
  cameraHeight: any;
  setSrcImg: (c: any) => void;
}

function OCRCamera(props: Props) {
  const { cameraHeight, setSrcImg } = props;
  const camera = useRef<CameraType>(null);
  return (
    <div style={{ ...styles.wrapperWebCam, height: cameraHeight }}>
      <Image
        src={images.ekycCameraFrame}
        style={styles.frameStyle}
        preview={false}
      />
      <Camera
        ref={camera}
        errorMessages={{
          noCameraAccessible: strings.identityVerification.noCameraAccessible,
          permissionDenied: strings.identityVerification.permissionDenied
        }}
        aspectRatio="cover"
        facingMode="environment"
      />
      <Button
        style={styles.wrapperCapture}
        onClick={() => setSrcImg(camera?.current?.takePhoto())}
      >
        <Image
          src={images.icon_capture}
          preview={false}
          style={styles.iconCapture}
        />
      </Button>
    </div>
  );
}

const styles: StylesDictionary = {
  wrapperWebCam: {
    position: 'relative',
    width: '100%',
    zIndex: 1,
    marginTop: sizes._35sdp
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
  }
};

export default OCRCamera;
