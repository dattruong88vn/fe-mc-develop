import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './AuthReducer';
import { tokenReducer } from './TokenReducer';
import { ocrReducer } from './OcrReducer';
import { identityReducer } from './IdentityReducer';

const authenSetup = {
  key: 'root',
  storage,
  whitelist: ['valueAppToken']
};

const rootReducer = combineReducers({
  authReducer: persistReducer(authenSetup, authReducer),
  tokenReducer: persistReducer(authenSetup, tokenReducer),
  ocrReducer,
  identityReducer
});

export default rootReducer;
