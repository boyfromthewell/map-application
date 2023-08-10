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

  const handleSubmitReview = async () => {
    if (!inputValue.length || !clickList.length) return;

    const timestamp = new Date().getTime();

    const isSubmit = await addReviewToFirestore({
      content: inputValue,
      timestamp,
      goodPoint: clickList,
      nid,
    });

    if (isSubmit) {
      onReviewSubmit();
      setInputValue('');
      setClickList([]);
    }
  };

  return (
    <>
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
    </>
  );
};

export default NewReviewInput;
