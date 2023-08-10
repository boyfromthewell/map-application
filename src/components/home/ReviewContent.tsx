import React, { useCallback, useEffect, useState } from 'react';
import { getDataFromFireStore } from '@/firebase';
import { Review } from '@/types/review';

import NewReviewInput from './NewReviewInput';
import ReviewList from './ReviewList';

const ReviewContent = ({ nid }: { nid: number }) => {
  const [reviewData, setReviewData] = useState<Review[]>([]);

  const refreshReviewData = useCallback(async () => {
    const data = (await getDataFromFireStore('reviewList')) as Review[];
    const filteredData = data.filter((item) => item.nid === nid);
    setReviewData(filteredData);
  }, [nid]);

  useEffect(() => {
    refreshReviewData();
  }, [nid, refreshReviewData]);

  return (
    <div>
      <h2>{`방문자 리뷰 (${reviewData.length})`}</h2>
      <NewReviewInput nid={nid} onReviewSubmit={refreshReviewData} />
      <ReviewList reviewData={reviewData} />
    </div>
  );
};

export default ReviewContent;
