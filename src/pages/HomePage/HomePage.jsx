import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <main>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Find your perfect rental car</h1>
          <p className={styles.heroSubtitle}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <button
            className={styles.button}
            onClick={() => navigate('/catalog')}
          >
            View Catalog
          </button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
