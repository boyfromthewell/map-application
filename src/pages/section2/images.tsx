import React from 'react';
import Image from 'next/image';
import example from '../../../public/inflearn.png';

// next/image (v13) : 상대적으로 용량이 작음, 서버에서 자동으로 이미지 용량 최적화 (webp, lazy loading 지원)

const Images = () => {
  return (
    <main>
      <hr style={{ margin: '32px 0' }} />

      <h1>img tag</h1>

      <figure>
        <img src="/inflearn.png" alt="example" width={500} height={100} />
      </figure>

      <hr style={{ margin: '32px 0' }} />

      <h1>next/image</h1>
      {/* 정적 이미지 */}
      <figure>
        <Image src={example} alt="v13 image" placeholder="blur" width={500} />
      </figure>

      {/* 외부 이미지는 너비와 높이를 미리 알수 없음, 빌드 타임에 미리 최적화 불가능 , width height 지정 필요*/}
      <figure>
        <Image
          src="https://lecture-1.vercel.app/example.jpg"
          alt="v13 image"
          width={500}
          height={100}
        />
      </figure>

      {/* 부모 요소에  width height 지정, Image에 fill 속성을 주는 방법도 있음*/}
      <figure style={{ position: 'relative', width: 500, height: 100 }}>
        <Image
          src="https://lecture-1.vercel.app/example.jpg"
          alt="v13 image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </figure>
    </main>
  );
};

export default Images;
