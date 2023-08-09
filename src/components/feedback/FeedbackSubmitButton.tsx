import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/feedback.module.scss';
import { addFeedbackToFirestore } from '@/firebase/feedback';
import { Feedback } from '@/types/feedback';

interface FeedbackSubmitButton {
  feedbackInput: string;
  rank: number;
  feedbackList: Feedback[];
  setFeedbackList: React.Dispatch<React.SetStateAction<Feedback[]>>;
  resetFeedbackInput: () => void;
}

const FeedbackSubmitButton = ({
  feedbackInput,
  rank,
  feedbackList,
  setFeedbackList,
  resetFeedbackInput,
}: FeedbackSubmitButton) => {
  const [secondLeft, setSecondLeft] = useState(0);
  const timer = useRef<number | NodeJS.Timeout | null>(null);

  const handleClickSubmitFeedback = async () => {
    if (!feedbackInput.length || rank === 0) return;

    const timestamp = new Date().getTime();
    // update fire base
    const isSubmit = await addFeedbackToFirestore({
      content: feedbackInput,
      timestamp,
      rank,
    });

    if (isSubmit) {
      setFeedbackList([
        { rank, timestamp, content: feedbackInput },
        ...feedbackList,
      ]);
      resetFeedbackInput();

      setSecondLeft(2);
      timer.current = setInterval(() => {
        setSecondLeft((prev) => prev - 1);
      }, 1000);
    }
  };

  useEffect(() => {
    if (secondLeft === 0) {
      if (typeof timer.current === 'number') clearInterval(timer.current);
      timer.current = null;
    }
  }, [secondLeft]);

  return (
    <>
      <button
        className={styles.submitButton}
        onClick={handleClickSubmitFeedback}
        disabled={secondLeft > 0}
      >
        {secondLeft > 0 ? '피드백 등록이 완료되었습니다.' : '피드백 등록'}
      </button>
    </>
  );
};

export default FeedbackSubmitButton;
