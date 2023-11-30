import React, { useCallback, useEffect, useState } from 'react';
import styles from '@/styles/detail.module.scss';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import { getFileInfoFromFirestore } from '@/firebase/storage';
import Image from 'next/image';
import { FileType } from '@/types/review';
import ModalPortal from '../common/ModalPortal';
import ImagePopup from '../common/ImagePopup';

const UploadImage = ({ timestamp }: { timestamp: number }) => {
  const [fileData, setFileData] = useState<FileType[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const getFileInfo = useCallback(async () => {
    const data = await getFileInfoFromFirestore();
    const fileteredData = data.filter((item) => item.timestamp === timestamp);
    setFileData(fileteredData);
  }, [timestamp]);

  const onClickImage = (url: string) => {
    setIsPopupOpen(true);
    setCurrentImage(url);
  };

  useEffect(() => {
    getFileInfo();
  }, [getFileInfo]);

  return (
    <>
      <ScrollContainer>
        <div className={styles.userUploadImageContainer}>
          {fileData?.map((data) => (
            <Image
              className={styles.uploadImg}
              src={data.url}
              key={data.filename}
              alt="user_image"
              priority
              width={170}
              height={170}
              onClick={() => onClickImage(data.url)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </ScrollContainer>
      {isPopupOpen && (
        <ModalPortal>
          <ImagePopup
            img={currentImage}
            onClose={() => setIsPopupOpen(false)}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default UploadImage;
