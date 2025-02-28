import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../../redux/favoritesSlice";
import { formatMileage } from "../../helpers/formatMileage";
import sprite from "../../images/sprite.svg";
import styles from "./CarCard.module.css";

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((favCar) => favCar.id === car.id);

  const addressParts = car.address.split(", ");
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
            isFavorite ? styles.isFavorite : ""
          }`}
          onClick={handleToggleFavorite}
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg className={styles.heartIcon} width="18" height="18">
            <use
              href={`${sprite}#icon-${
                isFavorite ? "blue-heart" : "white-heart"
              }`}
            />
          </svg>
        </button>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.titleRow}>
          <h3 className={styles.carTitle}>
            {car.brand}{" "}
            <span className={styles.modelHighlight}>{car.model}</span>,{" "}
            {car.year}
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

        <div className={styles.buttonContainer}>
          <Link to={`/catalog/${car.id}`} className={styles.button}>
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
