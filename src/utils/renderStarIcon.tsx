import StarIcon from '../../public/star.svg';
import StarFillIcon from '../../public/solid_star.svg';

export const renderStarIcon = (rank: number) => {
  const starIcons = [];
  for (let i = 0; i < rank; i++) {
    starIcons.push(<StarFillIcon key={`star-${i}`} />);
  }
  for (let i = 0; i < 5 - rank; i++) {
    starIcons.push(<StarIcon key={`star-empty-${i}`} />);
  }
  return starIcons;
};
