import Header from '@/components/common/Header';
import { NextSeo } from 'next-seo';

const Feedback = () => {
  return (
    <>
      <NextSeo
        title="피드백"
        description="서비스 피드백 페이지 입니다."
        canonical="https://map-application-mocha.vercel.app/feedback"
      />
      <Header />
      <main></main>
    </>
  );
};

export default Feedback;
