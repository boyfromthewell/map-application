import React, { useState } from 'react';
import StarIcon from '../../../public/star.svg';
import StarFillIcon from '../../../public/solid_star.svg';
import styles from '@/styles/feedback.module.scss';
import { StarType } from './FeedbackSection';

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

  const handleClickStar = (idx: number) => {
    const stars = [];
    for (let i = 0; i < idx + 1; i++) {
      stars.push(<StarFillIcon key={i} />);
    }
    for (let i = 0; i < 5 - idx - 1; i++) {
      stars.push(<StarIcon key={i} />);
    }
    setStar({ ...star, icons: stars, rank: idx + 1 });
  };

  return (
    <div className={styles.newFeedbackInput}>
      <div className={styles.stars}>
        {!star.icons.length &&
          initialStar.map((icon, idx) => (
            <span key={idx} onClick={() => handleClickStar(idx)}>
              {icon}
            </span>
          ))}
        {star?.icons.map((icon, idx) => (
          <span key={idx} onClick={() => handleClickStar(idx)}>
            {icon}
          </span>
        ))}
      </div>
      <textarea value={feedbackInput} onChange={onChange} maxLength={50} />
    </div>
  );
};

export default NewFeedbackInput;
