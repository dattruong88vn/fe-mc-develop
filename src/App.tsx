import InfoModal from 'components/modals/InfoModal';
import LoadingManager from 'components/spinnerLoading/LoadingManager';
import colors from 'configs/res/colors';
import sizes from 'configs/res/sizes';
import strings from 'configs/res/strings';
import moment from 'moment';
import 'moment/locale/vi';
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import routes from 'routes';
import { SCREENS } from 'routes/ScreensName';
import { getTokenData } from 'store/actions/TokenAction';
import { persistor, store } from 'store/store';
import { StylesDictionary } from 'utils/Utils';
import './App.css';
import SpinnerLoading from './components/spinnerLoading';
import {
  addEventListeners,
  removeEventListeners
} from '../src/utils/TimeoutEvent';
import {
  handleGetDataFromApp,
  handleGetSignLogin
} from 'utils/Containers/AppContainer';

const SessionExpiredScreen = React.lazy(
  () => import('pages/auth/SessionExpired')
);

function App() {
  const refLoading = useRef();
  const [isDone, setIsDone] = useState<boolean>(false);
  // const token = useSelector((state: any) => state?.authenReducer?.token);
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  // const [timeoutTime, setTimeoutTime] = useState(600000); // 10 munites
  const timeoutTime = 600000; // test

  useEffect(() => {
    const createTimeOut = () =>
      setTimeout(() => {
        // Implement a sign out function here
        window.location.href = SCREENS.SESSION_EXPIRED_SCREEN;
      }, timeoutTime);

    const listener = () => {
      clearTimeout(sesstionTimeout);
      sesstionTimeout = createTimeOut();
    };

    // Initialization
    let sesstionTimeout = createTimeOut();
    addEventListeners(listener);

    // Cleanup
    return () => {
      removeEventListeners(listener);
      clearTimeout(sesstionTimeout);
    };
  }, [timeoutTime]);

  useLayoutEffect(() => {
    handleGetSignLogin(setIsDone, getTokenData);
    // handleGetDataFromApp(setIsDone, getTokenData, setIsShowDialog);
    moment.locale('vi');
  }, []);

  useEffect(() => {
    if (refLoading) LoadingManager.register(refLoading);
    return () => {
      LoadingManager.unregister(refLoading);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={<div />}>
            {isDone ? (
              <Switch>
                <Redirect exact from="/" to={SCREENS.BNPL_INTRODUCTION} />
                {/* to={{ // Pass if need to detech pending
                pathname: SCREENS.ECONTRACTCONCEPT,
                state: { isPending: true },
              }} */}
                {routes.map((route) => (
                  <Route
                    component={route.component}
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                  />
                ))}
              </Switch>
            ) : (
              <Switch>
                <Route
                  component={SessionExpiredScreen}
                  key={'SessionExpiredScreen'}
                  path={SCREENS.SESSION_EXPIRED_SCREEN}
                  exact={true}
                />
              </Switch>
            )}
            <SpinnerLoading ref={refLoading} />
          </Suspense>
        </BrowserRouter>
        <SpinnerLoading ref={refLoading} />
      </PersistGate>
      {isShowDialog ? (
        <InfoModal
          handleButton1={() => {
            setIsShowDialog(false);
          }}
          content={strings.identityVerification.failSystem}
          title={strings.identityVerification.waitingCompleted}
          btnStyle={styles.btnStyle}
          btnContent={strings.signContract.ok}
          isHideClose
        />
      ) : null}
    </Provider>
  );
}

const styles: StylesDictionary = {
  btnStyle: {
    width: '100%',
    margin: 'auto',
    marginTop: sizes._20sdp,
    borderRadius: sizes._10sdp,
    border: 'none',
    padding: `${sizes._10sdp}px ${sizes._10sdp}px`,
    background: colors.mainBlue,
    color: colors.white,
    fontSize: sizes._16sdp,
    fontWeight: 600,
    display: 'block'
  }
};
export default App;
