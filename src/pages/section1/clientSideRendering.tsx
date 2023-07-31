import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

// width 값은 서버에서 렌더링 하지 않음, html 파일에서 완전히 제거
const NoSSR = dynamic(() => import('@/components/section1/NoSSR'), {
  ssr: false,
});

const Example = () => {
  const [data, setData] = useState(0);

  useEffect(() => {
    const delayInSeconds = 2;
    new Promise<number>((resolve) =>
      setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
    ).then((res) => setData(res));
  }, []);

  // CSR
  // 처음에는 초기 값으로 프리렌더링, 자바스크립트 상태가 바뀌면 DOM도 바뀜
  return (
    <main>
      <h1>client-side data fetching</h1>
      <p>{data}</p>

      <h1>no SSR</h1>
      <NoSSR />
    </main>
  );
};

export default Example;
