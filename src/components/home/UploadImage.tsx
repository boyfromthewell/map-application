import React, { useCallback, useEffect, useState } from 'react';
import styles from '@/styles/detail.module.scss';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import { getFileInfoFromFirestore } from '@/firebase/storage';
import Image from 'next/image';
import { FileType } from '@/types/review';

const UploadImage = ({ timestamp }: { timestamp: number }) => {
  const [fileData, setFileData] = useState<FileType[]>([]);

  const getFileInfo = useCallback(async () => {
    const data = await getFileInfoFromFirestore();
    const fileteredData = data.filter((item) => item.timestamp === timestamp);
    setFileData(fileteredData);
  }, [timestamp]);

  useEffect(() => {
    getFileInfo();
  }, [getFileInfo]);

  return (
    <ScrollContainer>
      <div className={styles.userUploadImageContainer}>
        {fileData?.map((data) => (
          <div className={styles.imageCover} key={data.url}>
            <Image
              className={styles.uploadImg}
              src={data.url}
              key={data.filename}
              alt="user_image"
              width={170}
              height={170}
            />
          </div>
        ))}
      </div>
    </ScrollContainer>
  );
};

export default UploadImage;
