import React, { Fragment, useRef } from 'react';
import styles from '@/styles/detail.module.scss';
import PlusIcon from '../../../public/plus.svg';
import Image from 'next/image';
import { ImageType } from '@/types/review';
import { ScrollContainer } from 'react-indiana-drag-scroll';

interface ImageUploadSectionProps {
  imageUrl: ImageType[];
  setImageUrl: React.Dispatch<React.SetStateAction<ImageType[]>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImageUploadSection = ({
  imageUrl,
  setImageUrl,
  files,
  setFiles,
}: ImageUploadSectionProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickUploadBox = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;

    if (image && image.length > 0) {
      const selectedFiles = Array.from(image);
      setFiles([...files, ...selectedFiles]);

      const url = URL.createObjectURL(image[0]);
      setImageUrl((prev: ImageType[]) => [
        ...prev,
        { id: new Date().getTime(), url },
      ]);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <label className={styles.imageUploadBox} onClick={handleClickUploadBox}>
        <PlusIcon />
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={uploadImage}
        />
      </label>
      <ScrollContainer hideScrollbars>
        <div className={styles.imageContainer}>
          {imageUrl?.map(({ id, url }) => (
            <Fragment key={id}>
              <div className={styles.imageCover}>
                <Image
                  className={styles.uploadImg}
                  width={150}
                  height={150}
                  key={id}
                  alt="유저 업로드 이미지"
                  src={url}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </ScrollContainer>
    </div>
  );
};

export default ImageUploadSection;
