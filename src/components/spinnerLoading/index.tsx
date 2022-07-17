import sizes from 'configs/res/sizes';
import React, {
  CSSProperties,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ReactLoading from 'react-loading';
import LoadingManager from './LoadingManager';

const TIME_OUT = 1000 * 30;

export function showLoading() {
  const ref = LoadingManager.getDefault();

  if (ref) {
    ref?.current?.showLoading();
  }
}

export function hideLoading() {
  const ref = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.hideLoading();
  }
}
function SpinnerLoading(props: any, ref: any) {
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeout: any = useRef();
  useImperativeHandle(ref, () => {
    return {
      hideLoading,
      showLoading
    };
  });
  const hideLoading = () => {
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }
    return () => {
      if (loadingTimeout.current) {
        clearTimeout(loadingTimeout.current);
      }
    };
  }, []);

  const showLoading = () => {
    loadingTimeout.current = setTimeout(() => {
      setIsLoading(false);
    }, TIME_OUT);
    setIsLoading(true);
  };
  if (!isLoading) return null;
  return (
    <div style={container}>
      <ReactLoading type="spinningBubbles" color="#fff" />
    </div>
  );
}

const container: CSSProperties = {
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  position: 'fixed',
  width: sizes.WIDTH,
  height: sizes.HEIGHT,
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999
};

export default forwardRef(SpinnerLoading);
