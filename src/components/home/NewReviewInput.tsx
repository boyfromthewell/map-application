import { addReviewToFirestore } from '@/firebase/review';
import styles from '@/styles/detail.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import ImageUploadSection from './ImageUploadSection';
import { ImageType } from '@/types/review';

import { addFileInfoToFirestore, storage } from '@/firebase/storage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const GOOD_POINT_TEXT = [
  '☕커피가 맛있어요',
  '😊매장이 청결해요',
  '🥨디저트가 맛있어요',
  '👩‍🍳특별한 메뉴가 있어요',
  '❤친절해요',
  '🏠인테리어가 멋져요',
  '👨‍❤️‍💋‍👨대화하기 좋아요',
  '💎비싼 만큼 가치있어요',
  '💐특별한 날 가기 좋아요',
];

const NewReviewInput = ({
  nid,
  onReviewSubmit,
}: {
  nid: number;
  onReviewSubmit: () => void;
}) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [toggleImageUpload, setToggleImageUpload] = useState(false);
  const [clickList, setClickList] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<ImageType[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [isNotValidInfo, setIsNotValidInfo] = useState({ message: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClickChip = (chipText: string) => {
    if (clickList.includes(chipText)) {
      setClickList(clickList.filter((text) => text !== chipText));
    } else {
      setClickList([...clickList, chipText]);
    }
  };

  const resetState = () => {
    setInputValue('');
    setClickList([]);
    setFiles([]);
    setImageUrl([]);
    setIsNotValidInfo({ message: '' });
    setToggleImageUpload(false);
  };

  const checkValidInput = () => {
    if (!inputValue.length) {
      setIsNotValidInfo({ message: '리뷰를 작성해주세요.' });
      return false;
    } else if (!clickList.length) {
      setIsNotValidInfo({ message: '하나 이상의 카테고리를 선택해주세요.' });
      return false;
    }
    return true;
  };

  const handleSubmitReview = async () => {
    if (!checkValidInput()) return;

    const timestamp = new Date().getTime();

    try {
      const uploadPromises = files.map(async (file: File) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytesResumable(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        return { filename: file.name, url: downloadUrl };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      const fileInfoPromises = uploadedFiles.map(async (fileInfo) => {
        await addFileInfoToFirestore({
          timestamp,
          filename: fileInfo.filename,
          url: fileInfo.url,
        });
      });

      await Promise.all(fileInfoPromises);

      const isSubmit = await addReviewToFirestore({
        content: inputValue,
        timestamp,
        goodPoint: clickList,
        nid,
      });

      if (isSubmit) {
        onReviewSubmit();
        resetState();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (toggleImageUpload && labelRef.current)
      labelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [toggleImageUpload]);

  return (
    <div style={{ position: 'relative', paddingBottom: 7 }}>
      <div className={styles.goodPoint}>
        {GOOD_POINT_TEXT.map((text) => (
          <p
            className={`${styles.chip} ${
              clickList.includes(text) && styles.selected
            }`}
            key={text}
            onClick={() => handleClickChip(text)}
          >
            {text}
          </p>
        ))}
      </div>
      <div className={styles.reviewInputContainer}>
        <input
          onChange={onChange}
          value={inputValue}
          placeholder="리뷰를 작성해주세요!"
        />
        <button onClick={handleSubmitReview}>리뷰 등록</button>
      </div>
      <p className={styles.errorMessage}>{isNotValidInfo.message}</p>
      <p
        className={styles.uploadImage}
        onClick={() => setToggleImageUpload(!toggleImageUpload)}
      >
        이미지 업로드
      </p>
      {toggleImageUpload && (
        <ImageUploadSection
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          files={files}
          setFiles={setFiles}
          ref={labelRef}
        />
      )}
    </div>
  );
};

export default NewReviewInput;
