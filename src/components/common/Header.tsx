import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link href="/" className={styles.box}>
          <img src="/inflearn.png" width={110} height={20} alt="인프런 로고" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
