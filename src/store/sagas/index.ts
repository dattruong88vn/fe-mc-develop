import { all, fork } from 'redux-saga/effects';

function* rootSaga() {
  yield all([].map(fork));
}

export default rootSaga;
