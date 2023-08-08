import { Feedback } from '@/types/feedback';
import React from 'react';

interface FeedbackListProps {
  feedbackList: Feedback[];
}

const FeedbackList = ({ feedbackList }: FeedbackListProps) => {
  console.log(feedbackList);
  return <div>FeedbackList</div>;
};

export default FeedbackList;
