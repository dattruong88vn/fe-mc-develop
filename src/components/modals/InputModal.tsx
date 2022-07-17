import vi from 'assets/languages/vi';
import colors from 'configs/res/colors';
import images from 'configs/res/images';
import sizes from 'configs/res/sizes';
import React, { useState } from 'react';
import { validateEmail } from 'utils/Utils';
import BaseText from '../BaseText';
import ModalWrapper from './ModalWrapper';

interface InputModalProps {
  handleCloseModal: () => void;
  addEmail: (email: string) => void;
}

export default function InputModal(props: InputModalProps) {
  const { handleCloseModal, addEmail } = props;
  const [valueInput, setValueInput] = useState('');

  function handleAddEmail() {
    if (valueInput) {
      addEmail(valueInput);
      handleCloseModal();
    }
  }

  return (
    <ModalWrapper containerStyle={styles.modalWrapper}>
      <BaseText
        content={vi.identityVerification.cancel}
        textContainerStyle={styles.cancelButton}
        handleClick={() => handleCloseModal()}
      />
      <div style={styles.inputWrapper}>
        <input
          type="email"
          style={styles.input}
          onChange={(e) => setValueInput(e.target.value)}
          value={valueInput}
        />
        <div
          style={{
            ...styles.approveBtn,
            background:
              valueInput && validateEmail(valueInput)
                ? colors.mainBlue
                : colors.greyC6CBD4
          }}
          onClick={() => validateEmail(valueInput) && handleAddEmail()}
        >
          <img src={images.approveTick} />
        </div>
      </div>
    </ModalWrapper>
  );
}

const styles = {
  modalWrapper: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    background: 'white',
    padding: `${sizes._12sdp}px ${sizes._16sdp}px`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: sizes._72sdp
  },
  cancelButton: {
    fontSize: sizes._17sdp,
    fontWeight: 600,
    color: colors.blue0A73F0
  },
  inputWrapper: {
    width: '100%',
    height: '100%',
    background: colors.greyEEEFF1,
    borderRadius: sizes._24sdp,
    marginLeft: sizes._14sdp,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: sizes._20sdp,
    paddingRight: sizes._9sdp
  },
  input: {
    width: sizes._230sdp,
    border: 'none',
    background: colors.transparent,
    caretColor: colors.mainBlue,
    color: colors.black0A2851
  },
  approveBtn: {
    width: sizes._36sdp,
    height: sizes._36sdp,
    borderRadius: sizes._18sdp,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};
