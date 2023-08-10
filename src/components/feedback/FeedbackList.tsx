import { Feedback } from '@/types/feedback';
import React from 'react';
import styles from '@/styles/feedback.module.scss';
import { dateParsing } from '@/utils/date';
import { pickThemeByTimestamp } from '@/utils/pickColorByTimestamp';
import { FEEDBACK_COLOR_SET } from '@/styles/colorSet';
import { renderStarIcon } from '@/utils/renderStarIcon';

interface FeedbackListProps {
  feedbackList: Feedback[];
}

const FeedbackList = ({ feedbackList }: FeedbackListProps) => {
  return (
    <>
      {feedbackList.map(({ content, timestamp, rank }) => {
        const theme = pickThemeByTimestamp(timestamp);

        return (
          <div
            className={styles.feedbackBoard}
            style={{
              background: `linear-gradient(
                to left top,
                transparent 50%,
                ${FEEDBACK_COLOR_SET[theme].secondary} 0
              ) no-repeat 100% 100% / 22px 22px,
              linear-gradient(
                to left top,
                transparent 15.3px,
                ${FEEDBACK_COLOR_SET[theme].primary} 0
              )`,
            }}
            key={timestamp}
          >
            <div className={styles.stars}>{renderStarIcon(rank)}</div>
            <p
              className={styles.feedbackContent}
              style={{
                border: `1px solid ${FEEDBACK_COLOR_SET[theme].secondary}`,
              }}
            >
              {content}
            </p>
            <p className={styles.timestamp}>
              {dateParsing({ dateNum: timestamp, parseType: 'feedback' })}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default FeedbackList;
