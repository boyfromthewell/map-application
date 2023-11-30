import React, { useCallback, useEffect, useState } from 'react';
import styles from '@/styles/header.module.scss';
import Link from 'next/link';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { FaSun } from 'react-icons/fa';
import { MdModeNight } from 'react-icons/md';
import { VscFeedback } from 'react-icons/vsc';
import HeaderComponent from '@/components/common/Header';
import useMap from '@/hooks/useMap';
import { useRouter } from 'next/router';
import copy from 'copy-to-clipboard';

const Header = () => {
  const { resetMapOptions, getMapOptions } = useMap();
  const [icon, setIcon] = useState<JSX.Element | null>(null);
  const [currentTheme, setCurrentTheme] = useState('');
  const router = useRouter();

  const replaceAndCopyUrl = useCallback(() => {
    const mapOptions = getMapOptions();
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;

    router.replace(query);
    copy(location.origin + query);
  }, [getMapOptions, router]);

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    setCurrentTheme(currentTheme!);
    if (currentTheme === 'light') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  const renderIcon = () => {
    if (!localStorage.getItem('theme')) setIcon(<MdModeNight size={20} />);
    else if (localStorage.getItem('theme') === 'light') {
      setIcon(<MdModeNight size={20} />);
    } else {
      setIcon(<FaSun size={20} />);
    }
  };

  useEffect(() => {
    renderIcon();
  }, [currentTheme]);

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
          {icon}
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
