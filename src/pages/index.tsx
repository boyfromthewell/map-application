import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import Header from '@/components/common/Header';
import MapSection from '@/components/home/MapSection';
import styles from '@/styles/header.module.scss';
import Link from 'next/link';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import { Store } from '../../types/store';
import useStores from '@/hooks/useStores';

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
      <Header
        rightElements={[
          <button
            key="button"
            onClick={() => alert('복사')}
            style={{ marginRight: 8 }}
            className={styles.box}
          >
            <AiOutlineShareAlt size={20} />
          </button>,
          <Link href="/feedback" className={styles.box} key="link">
            <VscFeedback size={20} />
          </Link>,
        ]}
      />
      <main style={{ width: '100%', height: '100%' }}>
        <MapSection />
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
