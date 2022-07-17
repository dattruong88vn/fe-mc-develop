class LoadingManager {
  _refLoading: any;
  register(_ref: any) {
    this._refLoading = _ref;
  }

  unregister(_ref: any) {
    if (
      !!this._refLoading &&
      this._refLoading._id &&
      this._refLoading._id === _ref._id
    ) {
      this._refLoading = null;
    }
  }

  getDefault() {
    return this._refLoading;
  }
}

export default new LoadingManager();
