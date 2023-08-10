import { Feedback } from '@/types/feedback';
import { Review } from '@/types/review';
import { initializeApp } from '@firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
} from '@firebase/firestore';

type DataType = Feedback | Review;

type DataStringType = 'feedbackList' | 'reviewList';

initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

export const firestore = getFirestore();

export const getDataFromFireStore = async (dataType: DataStringType) => {
  const dataCollection = collection(firestore, dataType);

  const initialList: DataType[] = [];

  const querySnapShot = await getDocs(
    query(dataCollection, orderBy('timestamp', 'desc'))
  );

  querySnapShot.forEach((doc: any) => {
    initialList.push(doc.data() as DataType);
  });

  return initialList;
};
