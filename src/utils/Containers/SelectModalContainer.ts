import ResponseCode from 'apis/ResponseCode';
import { LocationObj } from 'components/modals/SelectModal';
import { removeVietnameseTones } from 'utils/Utils';
import AuthenApi from 'apis/subs/authen/AuthApi';

export const getFullLocation = (
  isShowSelectModal: number,
  getListLocation: any,
  urls: any,
  province: any,
  district: any
) => {
  if (isShowSelectModal === 1) {
    getListLocation(urls.provincesList);
  } else if (isShowSelectModal === 2 && province) {
    getListLocation(`${urls.districtsList}/${province.code}`);
  } else if (isShowSelectModal === 3 && district) {
    getListLocation(`${urls.wardsList}/${district.code}`);
  }
};

export const onLocationList = async (
  setOriginalDataList: any,
  setDataList: any,
  url: any
) => {
  try {
    const res: any = await AuthenApi.getListLocation<LocationObj[]>(url);
    if (res.status === ResponseCode.SUCCESS) {
      res.data.map(
        (e: LocationObj) =>
          (e.nameToSearch = removeVietnameseTones(e.name).toLowerCase())
      );
      setOriginalDataList(res.data);
      setDataList(res.data);
    }
  } catch (error) {
    console.log('error: ', error);
  }
};

export const onSearch = (txt: any, originalDataList: any, setDataList: any) => {
  if (txt) {
    const dataListFiltered = originalDataList.filter(
      (e: LocationObj) =>
        e.nameToSearch?.includes(removeVietnameseTones(txt.toLowerCase())) ||
        e.nameToSearch?.includes(txt.toLowerCase())
    );
    setDataList(dataListFiltered);
  } else setDataList(originalDataList);
};
