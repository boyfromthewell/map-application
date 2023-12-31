import React from 'react';
import { Store } from '../../types/store';
import styles from '@/styles/detail.module.scss';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';

import Image from 'next/image';
import Naver from '../../../public/naver.png';
import ReviewContent from './ReviewContent';

interface DetailContentProps {
  currentStore?: Store;
  expanded: boolean;
}

const DetailContent = ({ currentStore, expanded }: DetailContentProps) => {
  if (!currentStore) return null;
  return (
    <div
      className={`${styles.detailContent} ${expanded ? styles.expanded : ''}`}
    >
      <div className={styles.images}>
        {currentStore.images.slice(0, 3).map((image) => (
          <div
            style={{ position: 'relative', maxWidth: 120, height: 80 }}
            key={image}
          >
            <Image
              src={image}
              alt="store image"
              fill
              style={{ objectFit: 'cover' }}
              sizes="120px"
              placeholder="blur"
              priority
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0WhFsDwADzwF2mLYSJgAAAABJRU5ErkJggg=="
            />
          </div>
        ))}
      </div>
      {expanded && (
        <>
          <div className={styles.description}>
            <h2>설명</h2>
            <p>{currentStore.description || '정보가 없습니다.'}</p>
          </div>
          <hr />
          <div className={styles.basicInfo}>
            <h2>기본 정보</h2>
            <div className="address">
              <IoLocationOutline size={20} />
              <span>{currentStore.address || '정보가 없습니다.'}</span>
            </div>
            <div className="phone">
              <IoCallOutline size={20} />
              <span>{currentStore.phone || '정보가 없습니다.'}</span>
            </div>
            <div className="naverUrl">
              <Image src={Naver} width={20} height={20} alt="네이버 로고" />
              <a
                href={`https://pcmap.place.naver.com/restaurant/${currentStore.nid}/home`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span>네이버 상세 정보</span>
              </a>
            </div>
          </div>
          <hr />
          <div className={styles.menus}>
            <h2>메뉴</h2>
            <ul>
              {currentStore.menus?.map((menu) => (
                <li className={styles.menu} key={menu.name}>
                  <span className={styles.name}>{menu.name}</span>
                  <span className={styles.price}>{menu.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <hr />
          <ReviewContent nid={currentStore.nid} />
        </>
      )}
    </div>
  );
};

export default DetailContent;
