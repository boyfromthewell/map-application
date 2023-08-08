import { Feedback } from '@/types/feedback';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/feedback.module.scss';
import NewFeedbackInput from './NewFeedbackInput';
import FeedbackSubmitButton from './FeedbackSubmitButton';
import FeedbackList from './FeedbackList';

export type StarType = { icons: React.ReactNode[]; rank: null | number };

interface FeedbackSectionProps {
  initialFeedbackList: Feedback[];
}

const FeedbackSection = ({ initialFeedbackList }: FeedbackSectionProps) => {
  const [feedbackInput, setFeedbackInput] = useState('');
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [star, setStar] = useState<StarType>({ icons: [], rank: null });

  const onChangeFeedback = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedbackInput(e.target.value);
  };

  useEffect(() => {
    setFeedbackList(initialFeedbackList);
  }, [initialFeedbackList]);

  return (
    <div className={styles.feedbackContainer}>
      <NewFeedbackInput
        feedbackInput={feedbackInput}
        star={star}
        setStar={setStar}
        onChange={onChangeFeedback}
      />
      <FeedbackList feedbackList={feedbackList} />
      <FeedbackSubmitButton
        feedbackInput={feedbackInput}
        rank={star.rank}
        feedbackList={feedbackList}
        setFeedbackList={setFeedbackList}
      />
    </div>
  );
};

export default FeedbackSection;
