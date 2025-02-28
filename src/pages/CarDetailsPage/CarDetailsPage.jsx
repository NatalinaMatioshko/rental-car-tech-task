import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCarById } from "../../redux/carsSlice";
import Loader from "../../components/Loader/Loader";
import BookingForm from "../../components/BookingForm/BookingForm";
import { formatMileage } from "../../helpers/formatMileage";
import sprite from "../../images/sprite.svg"; 
import styles from "./CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCar: car, loading } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(getCarById(id));
  }, [dispatch, id]);

  if (loading || !car) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

 
  const addressParts = car.address.split(", ");
  const city = addressParts[1] || "";
  const country = addressParts[2] || "";

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* LEFT COLUMN  */}
        <div className={styles.leftColumn}>
          {/* CAR IMAGE */}
          <div className={styles.imageContainer}>
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className={styles.carImage}
            />
          </div>

          {/* BOOKING*/}
          <div className={styles.bookingFormContainer}>
            <BookingForm />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          {/* TITLE & MAIN */}
          <h1 className={styles.carTitle}>
            {car.brand} {car.model}, {car.year}
          </h1>

          <div className={styles.locationInfo}>
            <svg className={styles.icon} width="16" height="16">
              <use href={`${sprite}#icon-location`}></use>
            </svg>
            {city}, {country}
            <span className={styles.mileageInfo}>
              Mileage: {formatMileage(car.mileage)} km
            </span>
          </div>

          <div className={styles.priceSection}>
            <span className={styles.price}>${car.rentalPrice}</span>
          </div>

          <div className={styles.description}>
            <p>{car.description}</p>
          </div>

          <div className={styles.carInfo}>
            {/* RENTAL*/}
            <div className={styles.sectionFirst}>
              <h2 className={styles.sectionTitle}>Rental Conditions:</h2>
              <ul className={styles.conditionsList}>
                {car.rentalConditions.map((condition, index) => {
                  if (condition.includes('Minimum age')) {
                    const [text, age] = condition.split(': ');
                    return (
                      <li key={index} className={styles.conditionItem}>
                        <svg
                          className={styles.conditionIcon}
                          width="16"
                          height="16"
                        >
                          <use href={`${sprite}#icon-check`}></use>
                        </svg>
                        {text}: <span className={styles.highlight}>{age}</span>
                      </li>
                    );
                  }
                  return (
                    <li key={index} className={styles.conditionItem}>
                      <svg
                        className={styles.conditionIcon}
                        width="16"
                        height="16"
                      >
                        <use href={`${sprite}#icon-check`}></use>
                      </svg>
                      {condition}
                    </li>
                  );
                })}
                <li className={styles.conditionItem}>
                  <svg className={styles.conditionIcon} width="16" height="16">
                    <use href={`${sprite}#icon-check`}></use>
                  </svg>
                  Security deposite required
                </li>
                <li className={styles.conditionItem}>
                  <svg className={styles.conditionIcon} width="16" height="16">
                    <use href={`${sprite}#icon-check`}></use>
                  </svg>
                  Valid driver`s license
                </li>
              </ul>
            </div>
            {/* Specifications */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Car Specifications:</h2>
              <ul className={styles.specsList}>
                <li className={styles.specItem}>
                  <svg className={styles.specIcon} width="16" height="16">
                    <use href={`${sprite}#icon-calendar`}></use>
                  </svg>
                  Year: {car.year}
                </li>
                <li className={styles.specItem}>
                  <svg className={styles.specIcon} width="16" height="16">
                    <use href={`${sprite}#icon-car`}></use>
                  </svg>
                  Type: {car.type}
                </li>
                <li className={styles.specItem}>
                  <svg className={styles.specIcon} width="16" height="16">
                    <use href={`${sprite}#icon-gas`}></use>
                  </svg>
                  Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={styles.specItem}>
                  <svg className={styles.specIcon} width="16" height="16">
                    <use href={`${sprite}#icon-setting`}></use>
                  </svg>
                  Engine Size: {car.engineSize}
                </li>
              </ul>
            </div>
            {/* Accessories */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Accessories and functionalities:
              </h2>
              <ul className={styles.accessoriesList}>
                {car.accessories.map((accessory, index) => (
                  <li
                    key={`accessory-${index}`}
                    className={styles.accessoryItem}
                  >
                    <svg
                      className={styles.accessoryIcon}
                      width="16"
                      height="16"
                    >
                      <use href={`${sprite}#icon-check`}></use>
                    </svg>
                    {accessory}
                  </li>
                ))}
                {car.functionalities.map((functionality, index) => (
                  <li
                    key={`functionality-${index}`}
                    className={styles.accessoryItem}
                  >
                    <svg
                      className={styles.accessoryIcon}
                      width="16"
                      height="16"
                    >
                      <use href={`${sprite}#icon-check`}></use>
                    </svg>
                    {functionality}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
