import React, { useCallback, useState } from 'react';
import styles from '@/styles/header.module.scss';
import Link from 'next/link';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import HeaderComponent from '@/components/common/Header';
import useMap from '@/hooks/useMap';
import { useRouter } from 'next/router';
import copy from 'copy-to-clipboard';

const Header = () => {
  const { resetMapOptions, getMapOptions } = useMap();
  const [currentThemeMode, setCurrentThemeMode] = useState('light');
  const router = useRouter();

  const replaceAndCopyUrl = useCallback(() => {
    const mapOptions = getMapOptions();
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;

    router.replace(query);
    copy(location.origin + query);
  }, [getMapOptions, router]);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setCurrentThemeMode(currentTheme!);

    if (currentTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  return (
    <HeaderComponent
      onClickLogo={resetMapOptions}
      rightElements={[
        <button
          key="themeBtn"
          style={{ marginRight: 8 }}
          className={styles.box}
          onClick={toggleTheme}
        >
          {currentThemeMode}
        </button>,
        <button
          key="button"
          onClick={replaceAndCopyUrl}
          style={{ marginRight: 8 }}
          aria-label="현재 위치 클립보드 복사"
          className={styles.box}
        >
          <AiOutlineShareAlt size={20} />
        </button>,
        <Link
          href="/feedback"
          className={styles.box}
          key="link"
          aria-label="피드백 페이지로 이동"
        >
          <VscFeedback size={20} />
        </Link>,
      ]}
    />
  );
};

export default Header;
