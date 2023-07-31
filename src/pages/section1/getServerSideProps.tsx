import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

interface Props {
  data: number;
}

const Example: NextPage<Props> = ({ data }) => {
  return (
    <main>
      <h1>getServerSideProps page</h1>
      {data}
    </main>
  );
};

export default Example;

// 2초동안 팬딩 상태
// 2초가 지나야지 결과가 랜더링
// SSR : 빌드 타임에 프리 렌더링 되는것이 아닌 request time -> 페이지에 들어올 때 마다 프리렌더링
// 사용자 인증정보에 따라 변하는 페이지, 페이지 동적으로 변하지만 보안 중요한곳에 사용 가능
export const getServerSideProps: GetServerSideProps = async () => {
  const delayInSeconds = 2;
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
  );

  return {
    props: {
      data,
    },
  };
};
