import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../images/Logo.svg';

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="RentalCar Logo" className={styles.logoImage} />
        </Link>
        <nav className={styles.navigation}>
          <Link
            to="/"
            className={`${styles.navLink} ${
              location.pathname === '/' ? styles.active : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/catalog"
            className={`${styles.navLink} ${
              location.pathname.includes('/catalog') ? styles.active : ''
            }`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
