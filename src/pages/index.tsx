import Header from '@/components/common/Header';
import MapSection from '@/components/home/MapSection';
import styles from '@/styles/header.module.scss';
import Link from 'next/link';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';

const Home = () => {
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
