import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { firestore } from '.';
import { Feedback } from '@/types/feedback';

export const feedbackListCollection = collection(firestore, 'feedbackList');

export const getFeedbacklistFromFirestore = async () => {
  const initialFeedbackList: Feedback[] = [];

  const querySnapShot = await getDocs(
    query(feedbackListCollection, orderBy('timestamp', 'desc'))
  );

  querySnapShot.forEach((doc: any) => {
    initialFeedbackList.push(doc.data() as Feedback);
  });

  return initialFeedbackList;
};

export const addFeedbackToFirestore = async (newFeedback: Feedback) => {
  try {
    await addDoc(feedbackListCollection, newFeedback);
    return true;
  } catch (e) {
    console.error(e);
  }
};
