import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button
      type="button"
      className={styles.loadMoreButton}
      onClick={onLoadMore}
    >
      Load more
    </button>
  );
};

export default LoadMoreBtn;
