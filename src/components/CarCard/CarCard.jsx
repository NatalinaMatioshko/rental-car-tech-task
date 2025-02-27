import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../../redux/favoritesSlice';
import { formatMileage } from '../../helpers/formatMileage';
import styles from './CarCard.module.css';

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((favCar) => favCar.id === car.id);

  const addressParts = car.address.split(', ');
  const city = addressParts[1];
  const country = addressParts[2];

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(car));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={styles.carImage}
        />
        <button
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.isFavorite : ''
          }`}
          onClick={handleToggleFavorite}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.6301 3.45753C15.247 3.07428 14.7922 2.77026 14.2916 2.56284C13.791 2.35542 13.2545 2.24866 12.7126 2.24866C12.1707 2.24866 11.6342 2.35542 11.1336 2.56284C10.633 2.77026 10.1782 3.07428 9.79509 3.45753L9.00009 4.25253L8.20509 3.45753C7.43132 2.68376 6.38186 2.24906 5.28759 2.24906C4.19331 2.24906 3.14386 2.68376 2.37009 3.45753C1.59632 4.2313 1.16162 5.28075 1.16162 6.37503C1.16162 7.4693 1.59632 8.51876 2.37009 9.29253L3.16509 10.0875L9.00009 15.9225L14.8351 10.0875L15.6301 9.29253C16.0133 8.90946 16.3174 8.45464 16.5248 7.95404C16.7322 7.45345 16.839 6.91689 16.839 6.37503C16.839 5.83316 16.7322 5.2966 16.5248 4.79601C16.3174 4.29542 16.0133 3.84059 15.6301 3.45753Z"
              fill="currentColor"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.titleRow}>
          <h3 className={styles.carTitle}>
            {car.brand} {car.model}, {car.year}
          </h3>
          <span className={styles.price}>${car.rentalPrice}</span>
        </div>

        <div className={styles.tagsContainer}>
          <span className={styles.tag}>{city}</span>
          <span className={styles.tag}>{country}</span>
          <span className={styles.tag}>{car.rentalCompany}</span>
          <span className={styles.tag}>{car.type}</span>
          <span className={styles.tag}>{car.brand}</span>
          <span className={styles.tag}>{formatMileage(car.mileage)}</span>
        </div>

        <Link to={`/catalog/${car.id}`} className={styles.button}>
          Read more
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
