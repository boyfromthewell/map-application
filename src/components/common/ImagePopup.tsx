import ModalPortal from './ModalPortal';
import styles from '@/styles/popup.module.scss';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';

interface AlertModalProps {
  img: string;
  onClose: () => void;
}

const ImagePopup = ({ img, onClose }: AlertModalProps) => {
  return (
    <ModalPortal>
      <div className={styles.background}></div>
      <div className={styles.imageContainer}>
        <button className={styles.closeBtn} onClick={onClose}>
          <IoClose size={50} color="#ececec" />
        </button>
        <Image
          src={img}
          alt="popup_image"
          fill
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>
    </ModalPortal>
  );
};

export default ImagePopup;
