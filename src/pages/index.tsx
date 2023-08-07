import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import MapSection from '@/components/home/MapSection';
import { Store } from '../types/store';
import useStores from '@/hooks/useStores';
import Header from '@/components/home/Header';
import DetailSection from '@/components/home/DetailSection';
import { NextSeo } from 'next-seo';

interface HomeProps {
  stores: Store[];
}

const Home = ({ stores }: HomeProps) => {
  const { initializeStores } = useStores();

  useEffect(() => {
    // 전역 상태 업데이트
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <>
      <NextSeo
        title="매장 지도"
        description="매장 지도 서비스입니다."
        canonical="https://map-application-mocha.vercel.app"
      />
      <Header />
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <MapSection />
        <DetailSection />
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const stores = (await import('../../public/stores.json')).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
};
