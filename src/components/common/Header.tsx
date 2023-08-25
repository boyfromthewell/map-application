import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/header.module.scss';

interface HeaderProps {
  onClickLogo?: () => void;
  rightElements?: React.ReactElement[];
}

const HeaderComponent = ({ onClickLogo, rightElements }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link
          href="/"
          className={styles.box}
          onClick={onClickLogo}
          aria-label="홈으로 이동"
        >
          <Image
            src="/naver.svg"
            width={110}
            height={20}
            alt="인프런 로고"
            priority
          />
        </Link>
      </div>
      <div className={styles.flexItem}>{rightElements}</div>
    </header>
  );
};

export default HeaderComponent;
