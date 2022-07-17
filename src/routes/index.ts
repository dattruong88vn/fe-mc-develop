import React from 'react';
import { SCREENS } from 'routes/ScreensName';

const HealthPing = React.lazy(() => import('pages/HealthPing'));
const RegisterScreen = React.lazy(
  () => import('pages/auth/AuthenticationScreen')
);
const AuthScreen = React.lazy(() => import('pages/auth'));
const IDAuthScreen = React.lazy(() => import('pages/auth/IDAuth'));
const FaceAuthScreen = React.lazy(() => import('pages/auth/FaceAuth'));
const InfoUserScreen = React.lazy(
  () => import('pages/identityVerification/InfoUserScreen')
);
const IdentificationScreen = React.lazy(
  () => import('pages/identityVerification/identification/IdentificationScreen')
);
const VerifyInfoUserScreen = React.lazy(
  () => import('pages/identityVerification/verifyInfoUser/VerifyInfoUserScreen')
);
const ResultOCRScreen = React.lazy(
  () => import('pages/identityVerification/identification/ResultOCRScreen')
);
const ResultEkycScreen = React.lazy(
  () => import('pages/identityVerification/ekyc/ResultEkycScreen')
);
const AuthErrorReportScreen = React.lazy(
  () => import('pages/authErrorReport/AuthErrorReportScreen')
);
const SuccessSentScreen = React.lazy(
  () => import('pages/authErrorReport/SuccessSentScreen')
);
const IdentificationApproveScreen = React.lazy(
  () => import('pages/identityVerification/IdentificationApproveScreen')
);
const EkycScreen = React.lazy(
  () => import('pages/identityVerification/ekyc/EkycScreen')
);
const IdentificationDefinitionScreen = React.lazy(
  () => import('pages/identityVerification/IdentificationDefinitionScreen')
);
const EIdentificationDefinitionScreen = React.lazy(
  () => import('pages/identityVerification/EIdentificationDefinitionScreen')
);
const EContractConceptScreen = React.lazy(
  () => import('pages/signContract/EContractConceptScreen')
);
const EContractInfoScreen = React.lazy(
  () => import('pages/signContract/econtractInfo/EContractInfoScreen')
);
const EContractViewerScreen = React.lazy(
  () => import('pages/signContract/econtractInfo/EContractViewerScreen')
);
const EContractOTPAuthScreen = React.lazy(
  () => import('pages/signContract/econtractOtpAuth/EContractOTPAuthScreen')
);
const EContractSuccessScreen = React.lazy(
  () => import('pages/signContract/EContractSuccessScreen')
);
const EContractFailScreen = React.lazy(
  () => import('pages/signContract/EContractFailScreen')
);
const EContractDefinitionScreen = React.lazy(
  () => import('pages/signContract/EContractDefinitionScreen')
);
const SessionExpiredScreen = React.lazy(
  () => import('pages/auth/SessionExpired')
);
const RegisterSucessScreen = React.lazy(
  () => import('pages/auth/RegisterSucessScreen')
);
const EContractOTPSuccessScreen = React.lazy(
  () => import('pages/signContract/EContractOTPSuccessScreen')
);
const BnplIntroductionScreen = React.lazy(
  () => import('pages/auth/BnplIntroductionScreen')
);
const EkycIntroductionScreen = React.lazy(
  () => import('pages/identityVerification/ekyc/EkycIntroductionScreen')
);
const EkycGuideScreen = React.lazy(
  () => import('pages/identityVerification/ekyc/EkycGuideScreen')
);
const routes = [
  {
    path: SCREENS.HEALTH,
    exact: true,
    name: 'Health',
    component: HealthPing
  },
  {
    path: SCREENS.REGISTER,
    exact: true,
    name: 'register',
    component: RegisterScreen
  },
  {
    path: SCREENS.INFO_USER,
    exact: true,
    name: 'info-user',
    component: InfoUserScreen
  },
  {
    path: SCREENS.AUTH,
    exact: true,
    name: 'auth',
    component: AuthScreen
  },
  {
    path: SCREENS.IDAUTH,
    exact: true,
    name: 'idauth',
    component: IDAuthScreen
  },
  {
    path: SCREENS.FACEAUTH,
    exact: true,
    name: 'faceauth',
    component: FaceAuthScreen
  },
  {
    path: SCREENS.IDENTIFICATION,
    exact: true,
    name: 'identification',
    component: IdentificationScreen
  },
  {
    path: SCREENS.RESULT_OCR,
    exact: true,
    name: 'ResultOCRScreen',
    component: ResultOCRScreen
  },
  {
    path: SCREENS.RESULT_EKYC,
    exact: true,
    name: 'resultEkycScreen',
    component: ResultEkycScreen
  },
  {
    path: SCREENS.VERIFYINFOUSER,
    exact: true,
    name: 'verifyinfouser',
    component: VerifyInfoUserScreen
  },
  {
    path: SCREENS.AUTHERRORREPORT,
    exact: true,
    name: 'autherrorreport',
    component: AuthErrorReportScreen
  },
  {
    path: SCREENS.SUCCESSSENT,
    exact: true,
    name: 'successSentScreen',
    component: SuccessSentScreen
  },
  {
    path: SCREENS.IDENTIFICATIONAPPROVE,
    exact: true,
    name: 'identificationApproveScreen',
    component: IdentificationApproveScreen
  },
  {
    path: SCREENS.IDENTIFICATIONDEFINITION,
    exact: true,
    name: 'identificationDefinition',
    component: IdentificationDefinitionScreen
  },
  {
    path: SCREENS.EIDENTIFICATIONDEFINITION,
    exact: true,
    name: 'eIdentificationDefinition',
    component: EIdentificationDefinitionScreen
  },
  {
    path: SCREENS.EKYC_SCREEN,
    exact: true,
    name: 'EkycScreen',
    component: EkycScreen
  },
  {
    path: SCREENS.ECONTRACTCONCEPT,
    exact: true,
    name: 'econtractConceptScreen',
    component: EContractConceptScreen
  },
  {
    path: SCREENS.ECONTRACTINFO,
    exact: true,
    name: 'econtractInfoScreen',
    component: EContractInfoScreen
  },
  {
    path: SCREENS.ECONTRACTVIEWER,
    exact: true,
    name: 'econtractViewerScreen',
    component: EContractViewerScreen
  },
  {
    path: SCREENS.ECONTRACTOTPAUTH,
    exact: true,
    name: 'econtractOtpAuthScreen',
    component: EContractOTPAuthScreen
  },
  {
    path: SCREENS.ECONTRACTSUCCESS,
    exact: true,
    name: 'econtractSuccessScreen',
    component: EContractSuccessScreen
  },
  {
    path: SCREENS.ECONTRACTFAIL,
    exact: true,
    name: 'econtractFailScreen',
    component: EContractFailScreen
  },
  {
    path: SCREENS.ECONTRACTDEFINITION,
    exact: true,
    name: 'econtractDefinition',
    component: EContractDefinitionScreen
  },
  {
    path: SCREENS.SESSION_EXPIRED_SCREEN,
    exact: true,
    name: 'SessionExpiredScreen',
    component: SessionExpiredScreen
  },
  {
    path: SCREENS.REGISTER_SUCCESS,
    exact: true,
    name: 'RegisterSucessScreen',
    component: RegisterSucessScreen
  },
  {
    path: SCREENS.ECONTRACTOTPSUCCESS,
    exact: true,
    name: 'EContractOTPSuccessScreen',
    component: EContractOTPSuccessScreen
  },
  {
    path: SCREENS.BNPL_INTRODUCTION,
    exact: true,
    name: 'bnplIntroductionScreen',
    component: BnplIntroductionScreen
  },
  {
    path: SCREENS.EKYC_INTRODUCTION,
    exact: true,
    name: 'ekycIntroductionScreen',
    component: EkycIntroductionScreen
  },
  {
    path: SCREENS.EKYC_GUIDE,
    exact: true,
    name: 'ekycGuideScreen',
    component: EkycGuideScreen
  }
];

export default routes;
