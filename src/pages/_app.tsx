import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from '../../seo.config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 전역 적으로 seo 적용 */}
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}
