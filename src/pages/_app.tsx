import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from '../../seo.config';
import Script from 'next/script';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('hi');
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <>
      {/* 전역 적으로 seo 적용 */}
      <DefaultSeo {...SEO} />
      {/** GA https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-1ZX08TKV00`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1ZX08TKV00');
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
