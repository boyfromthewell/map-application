import React, { useEffect, useRef, useState } from 'react';
import StarIcon from '../../../public/star.svg';
import StarFillIcon from '../../../public/solid_star.svg';
import styles from '@/styles/feedback.module.scss';
import { StarType } from './FeedbackSection';
import { renderStarIcon } from '@/utils/renderStarIcon';

interface NewFeedbackInputProps {
  feedbackInput: string;
  star: StarType;
  setStar: React.Dispatch<React.SetStateAction<StarType>>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const NewFeedbackInput = ({
  feedbackInput,
  star,
  setStar,
  onChange,
}: NewFeedbackInputProps) => {
  const initialStar = Array(5).fill(<StarIcon />);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleClickStar = (rank: number) => {
    setStar({ ...star, icons: renderStarIcon(rank), rank: rank });
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div className={styles.newFeedbackInput}>
      <h2>피드백을 남겨주세요!</h2>
      <div className={styles.stars}>
        {!star.icons.length &&
          initialStar.map((icon, idx) => (
            <span key={idx} onClick={() => handleClickStar(idx + 1)}>
              {icon}
            </span>
          ))}
        {star?.icons.map((icon, idx) => (
          <span key={idx} onClick={() => handleClickStar(idx + 1)}>
            {icon}
          </span>
        ))}
      </div>
      <textarea
        className={styles.text}
        value={feedbackInput}
        onChange={onChange}
        maxLength={80}
        ref={inputRef}
      />
      <p
        className={`${styles.textLength} ${
          feedbackInput.length === 80 && styles.lengthError
        }`}
      >{`${feedbackInput.length} / 80 `}</p>
    </div>
  );
};

export default NewFeedbackInput;
