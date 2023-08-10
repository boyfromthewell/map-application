import { Review } from '@/types/review';
import styles from '@/styles/detail.module.scss';
import React, { useState } from 'react';
import { dateParsing } from '@/utils/date';

interface ReviewListProps {
  reviewData: Review[];
}

const ReviewList = ({ reviewData }: ReviewListProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    if (expandedIndex.includes(index)) {
      setExpandedIndex(expandedIndex.filter((i) => i !== index));
    } else {
      setExpandedIndex([...expandedIndex, index]);
    }
  };

  return (
    <div className={styles.reviewListContainer}>
      {reviewData.map(({ content, goodPoint, timestamp }, index) => (
        <div key={content} className={styles.reviewCard}>
          <div className={styles.goodPointContainer}>
            {goodPoint.slice(0, 2).map((text) => (
              <p key={text} className={styles.goodPointChip}>
                {text}
              </p>
            ))}
            {expandedIndex.includes(index) &&
              goodPoint.slice(2).map((text, i) => (
                <p key={i} className={styles.goodPointChip}>
                  {text}
                </p>
              ))}
            {goodPoint.length > 2 && (
              <button
                onClick={() => toggleExpanded(index)}
                className={styles.showMoreBtn}
              >
                {expandedIndex.includes(index)
                  ? `<`
                  : `+${goodPoint.length - 2}`}
              </button>
            )}
          </div>
          <p className={styles.reviewContent}>{content}</p>
          <p className={styles.reviewDate}>
            {dateParsing({ dateNum: timestamp, parseType: 'review' })}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
