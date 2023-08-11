import { addReviewToFirestore } from '@/firebase/review';
import styles from '@/styles/detail.module.scss';
import React, { useState } from 'react';

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
  const [inputValue, setInputValue] = useState('');
  const [clickList, setClickList] = useState<string[]>([]);
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
    setIsNotValidInfo({ message: '' });
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
  };

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
    </div>
  );
};

export default NewReviewInput;
