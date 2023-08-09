import Header from '@/components/common/Header';
import FeedbackSection from '@/components/feedback/FeedbackSection';
import { getFeedbacklistFromFirestore } from '@/firebase/feedback';
import { Feedback } from '@/types/feedback';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

interface FeedbackProps {
  initialFeedbackList: Feedback[];
}

const Feedback = ({ initialFeedbackList }: FeedbackProps) => {
  return (
    <div style={{ backgroundColor: 'lightgray' }}>
      <NextSeo
        title="피드백"
        description="서비스 피드백 페이지 입니다."
        canonical="https://map-application-mocha.vercel.app/feedback"
        openGraph={{
          url: 'https://map-application-mocha.vercel.app/feedback',
        }}
      />
      <Header />
      <main>
        <FeedbackSection initialFeedbackList={initialFeedbackList} />
      </main>
    </div>
  );
};

export default Feedback;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      initialFeedbackList: await getFeedbacklistFromFirestore(),
    },
  };
};
