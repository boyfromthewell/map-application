import { initializeApp } from '@firebase/app';
import { getStorage } from 'firebase/storage';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '.';
import { FileType } from '@/types/review';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const filesCollection = collection(firestore, 'files');

export const addFileInfoToFirestore = async (newFile: any) => {
  try {
    await addDoc(filesCollection, newFile);
    return true;
  } catch (e) {
    console.error(e);
  }
};

export const getFileInfoFromFirestore = async () => {
  const initialList: FileType[] = [];
  const q = await getDocs(query(filesCollection));

  q.forEach((doc: any) => {
    initialList.push(doc.data() as FileType);
  });

  return initialList;
};
