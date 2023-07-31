import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Links = () => {
  const router = useRouter();

  useEffect(() => {
    // useRouter 사용시 prefetch 하기
    router.prefetch('/section1/getStaticProps');
  }, [router]);
  return (
    <main>
      <h1>Links</h1>

      {/* next/link는 pre-fetch 지원 */}

      {/*    <div style={{ height: '200vh' }}> </div> 
      <Link href="/section1/getStaticProps" style={{ color: 'red' }}>
        /getStaticProps
      </Link> */}

      <button onClick={() => router.push('/section1/getStaticProps')}>
        /getStaticProps
      </button>
    </main>
  );
};

export default Links;
