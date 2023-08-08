import React from 'react';
import styles from '@/styles/feedback.module.scss';
import { addFeedbackToFirestore } from '@/firebase/feedback';
import { Feedback } from '@/types/feedback';

interface FeedbackSubmitButton {
  feedbackInput: string;
  rank: number | null;
  feedbackList: Feedback[];
  setFeedbackList: React.Dispatch<React.SetStateAction<Feedback[]>>;
}

const FeedbackSubmitButton = ({
  feedbackInput,
  rank,
  feedbackList,
  setFeedbackList,
}: FeedbackSubmitButton) => {
  const handleClickSubmitFeedback = () => {
    const timestamp = new Date().getTime();
    // update fire base
    addFeedbackToFirestore({
      content: feedbackInput,
      timestamp,
      rank,
    });

    setFeedbackList([
      { rank, timestamp, content: feedbackInput },
      ...feedbackList,
    ]);
  };

  return (
    <>
      <button
        className={styles.submitButton}
        onClick={handleClickSubmitFeedback}
      >
        피드백 등록
      </button>
    </>
  );
};

export default FeedbackSubmitButton;
