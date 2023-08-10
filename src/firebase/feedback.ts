import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '.';
import { Feedback } from '@/types/feedback';

export const feedbackListCollection = collection(firestore, 'feedbackList');

export const addFeedbackToFirestore = async (newFeedback: Feedback) => {
  try {
    await addDoc(feedbackListCollection, newFeedback);
    return true;
  } catch (e) {
    console.error(e);
  }
};
