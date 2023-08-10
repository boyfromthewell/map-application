import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '.';
import { Review } from '@/types/review';

export const reviewkListCollection = collection(firestore, 'reviewList');

export const addReviewToFirestore = async (newReview: Review) => {
  try {
    await addDoc(reviewkListCollection, newReview);
    return true;
  } catch (e) {
    console.error(e);
  }
};
