import ResponseCode from 'apis/ResponseCode';
import AuthenApi from 'apis/subs/authen/AuthApi';
import vi from 'assets/languages/vi';
import BaseText from 'components/BaseText';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { useEffect, useState } from 'react';
import { removeVietnameseTones, StylesDictionary } from 'utils/Utils';
import ModalWrapper from './ModalWrapper';
import { v4 as uuidv4 } from 'uuid';
import {
  getFullLocation,
  onLocationList,
  onSearch
} from 'utils/Containers/SelectModalContainer';

interface SelectModalProps {
  handleCloseModal: () => void;
  isShowSelectModal: number;
  handleSelect?: (value: LocationObj, isShowSelectModal: number) => void;
  province?: LocationObj | null;
  district?: LocationObj | null;
}

export interface LocationObj {
  code: string;
  name: string;
  nameToSearch?: string;
  wpDistrictId: string | null;
  wpProvinceId: string | null;
  wpWardId: string | null;
}

export const urls = {
  provincesList:
    'https://dudu-uat.mcredit.com.vn/location-service/bpm/location/v1/provinces',
  districtsList:
    'https://dudu-uat.mcredit.com.vn/location-service/bpm/location/v1/districts',
  wardsList:
    'https://dudu-uat.mcredit.com.vn/location-service/bpm/location/v1/wards'
};

export default function SelectModal(props: SelectModalProps) {
  const {
    handleCloseModal,
    isShowSelectModal,
    handleSelect,
    province,
    district
  } = props;
  const [dataList, setDataList] = useState<LocationObj[]>([]);
  const [originalDataList, setOriginalDataList] = useState<LocationObj[]>([]);
  const [isSlide, setSlide] = useState(false);
  const [height, setHeight] = useState(window.innerHeight / 1.2);

  // Call location api according to isShowSelectModal prop
  useEffect(() => {
    getFullLocation(
      isShowSelectModal,
      getListLocation,
      urls,
      province,
      district
    );
  }, []);

  // reset popup height when user focus input (avoid keyboard push)
  useEffect(() => {
    const inputName = document.getElementById('inputName');
    inputName?.addEventListener('focus', () => {
      setHeight(window.innerHeight / 1.6);
    });
    inputName?.addEventListener('blur', () => {
      setTimeout(() => {
        setHeight(window.innerHeight / 1.2);
      }, 500);
    });
  }, []);

  async function getListLocation(url: string) {
    onLocationList(setOriginalDataList, setDataList, url);
  }

  function handleSearch(txt: string) {
    onSearch(txt, originalDataList, setDataList);
  }

  function _handleCloseModal() {
    setSlide(true);
    const timeout = setTimeout(() => {
      handleCloseModal();
      clearTimeout(timeout);
    }, 300);
  }

  return (
    <ModalWrapper
      containerStyle={{
        background: colors.white,
        height
      }}
      isSlide={isSlide}
    >
      <div style={styles.titleWrapper}>
        <div />
        <BaseText
          content={
            isShowSelectModal === 1
              ? vi.identityVerification.province
              : isShowSelectModal === 2
              ? vi.identityVerification.district
              : vi.identityVerification.ward
          }
          textContainerStyle={styles.title}
        />
        <div style={styles.close}>
          <img src={images.close} onClick={() => _handleCloseModal()} />
        </div>
      </div>
      <div style={styles.main}>
        <div style={styles.searchWrapper}>
          <img src={images.searchIcon} />
          <input
            id="inputName"
            type="text"
            placeholder={`${vi.identityVerification.inputName} ${
              isShowSelectModal === 1
                ? vi.identityVerification.province
                : isShowSelectModal === 2
                ? vi.identityVerification.district
                : vi.identityVerification.ward
            }`}
            style={styles.input}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div style={styles.listWrapper}>
          {dataList.map((data: LocationObj, index: number) => (
            <div
              key={uuidv4()}
              style={styles.list}
              onClick={() => {
                handleSelect && handleSelect(data, isShowSelectModal);
                _handleCloseModal();
              }}
            >
              <BaseText
                content={data.name}
                textContainerStyle={styles.content}
              />
              <img src={images.arrowRight} />
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
}

const styles: StylesDictionary = {
  titleWrapper: {
    width: '100%',
    padding: `${sizes._20sdp}px ${sizes._17sdp}px`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: sizes._15sdp,
    fontWeight: 700,
    color: colors.black0A2851
  },
  close: {
    width: sizes._20sdp,
    height: sizes._20sdp,
    borderRadius: sizes._10sdp,
    background: colors.blackMainWithOpacity(0.2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  main: {
    width: '100%',
    padding: `0 ${sizes._17sdp}px`
  },
  searchWrapper: {
    width: '100%',
    height: sizes._40sdp,
    borderRadius: sizes._20sdp,
    background: colors.greyF4F7FA,
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${sizes._21sdp}px`
  },
  input: {
    width: '100%',
    marginLeft: sizes._17sdp,
    border: 'none',
    background: colors.transparent
  },
  listWrapper: {
    width: '100%',
    height: window.innerHeight / 1.5,
    overflowY: 'scroll'
  },
  list: {
    width: '100%',
    height: sizes._59sdp,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: sizes._16sdp
  },
  content: {
    fontSize: sizes._17sdp,
    color: colors.black0A2851
  }
};
