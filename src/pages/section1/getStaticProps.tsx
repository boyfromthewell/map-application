import React from 'react';
import type { NextPage } from 'next';

interface Props {
  data: number;
}

const Example: NextPage<Props> = ({ data }) => {
  return (
    <main>
      <h1>getStaticProps</h1>
      {data}
    </main>
  );
};

export default Example;

// SSG : build 시간에 미리 화면에 대한 HTML을 미리 생성하여 사용자에게 미리 만들어진 화면을 제공
export const getStaticProps = async () => {
  const delayInSeconds = 2;
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
  );

  return {
    props: {
      data,
    },
    // ISR
    // Next.js will attempt to re-generate the page:
    revalidate: 5,
  };
};
