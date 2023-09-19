import styles from '@/styles/detail.module.scss';

const Progressbar = ({ percent }: { percent: number }) => {
  return (
    <div className={styles.progressbarContainer}>
      <div
        className={styles.progressbar}
        style={{ width: `${Math.floor(percent)}%` }}
      />
    </div>
  );
};

export default Progressbar;
