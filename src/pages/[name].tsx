import React from 'react';
import { Store } from '../types/store';
import styles from '@/styles/detail.module.scss';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import DetailHeader from '@/components/home/DetailHeader';
import DetailContent from '@/components/home/DetailContent';
import useCurrentStore from '@/hooks/useCurrentStore';

interface StoreDetailProps {
  store: Store;
}

const StoreDetail = ({ store }: StoreDetailProps) => {
  const expanded = true;
  const router = useRouter();
  const { setCurrentStore } = useCurrentStore();

  const goToMap = () => {
    setCurrentStore(store);
    router.push(
      `/?zoom=15&lat=${store.coordinates[0]}&lng=${store.coordinates[1]}`
    );
  };

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <div className={`${styles.detailSection} ${styles.expanded}`}>
      <DetailHeader
        currentStore={store}
        expanded={expanded}
        onClickArrow={goToMap}
      />
      <DetailContent currentStore={store} expanded={expanded} />
    </div>
  );
};

export default StoreDetail;

// 페이지 경로 정적으로 생성
export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('../../public/stores.json')).default;
  // 모든 매장 이름에 대한 경로 만들어 주기
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  // fallback 옵션
  // false => 빌드 타임에 모든 경로 만들어두고, 존재하지 않는 경로는 404 페이지 띄움
  // true => 빌드 타임에 모든 경로 만들지만 존재하지 않는 경로 들어가도 바로 404 페이지를 띄우지는 않음
  // 'blocking' => fallback true와 유사, getStaticProps가 리턴될때까지 UI를 가만히 blocking
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import('../../public/stores.json')).default;
  const store = stores.find((store) => store.name === params?.name);

  if (!store) {
    return {
      notFound: true, // 404 page
    };
  }

  return { props: { store } };
};
