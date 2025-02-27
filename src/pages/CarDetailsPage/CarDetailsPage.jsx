import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCarById } from '../../redux/cars/carsSlice';
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import { formatMileage } from '../../helpers/formatMileage';
import styles from './CarDetailsPage.module.css';

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCar: car, loading } = useSelector((state) => state.cars);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCarById(id));
  }, [dispatch, id]);

  const handleRentClick = () => {
    setIsModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // У реальному проекті тут був би запит на сервер для оформлення оренди
    toast.success('Your booking has been successfully submitted!');
    setIsModalOpen(false);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (loading || !car) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  // Розбиваємо умови оренди для відображення
  const formattedConditions = car.rentalConditions.map((condition) => {
    if (condition.includes('Minimum age')) {
      const [text, age] = condition.split(': ');
      return { text, value: age };
    }
    return { text: condition };
  });

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleGoBack}>
        Go back
      </button>

      <img
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        className={styles.carImage}
      />

      <h1 className={styles.carTitle}>
        {car.brand} {car.model}, {car.year}
      </h1>

      <div className={styles.tagsContainer}>
        <span className={styles.tag}>{car.address.split(', ')[1]}</span>
        <span className={styles.tag}>{car.address.split(', ')[2]}</span>
        <span className={styles.tag}>Id: {car.id}</span>
        <span className={styles.tag}>Year: {car.year}</span>
        <span className={styles.tag}>Type: {car.type}</span>
        <span className={styles.tag}>
          Fuel Consumption: {car.fuelConsumption}
        </span>
        <span className={styles.tag}>Engine Size: {car.engineSize}</span>
      </div>

      <p className={styles.description}>{car.description}</p>

      <h2 className={styles.sectionTitle}>Accessories and functionalities:</h2>
      <ul className={styles.featuresList}>
        {[...car.accessories, ...car.functionalities].map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            {feature}
          </li>
        ))}
      </ul>

      <h2 className={styles.sectionTitle}>Rental Conditions:</h2>
      <ul className={styles.conditionsList}>
        {formattedConditions.map((condition, index) => (
          <li key={index} className={styles.conditionItem}>
            {condition.text}
            {condition.value && <span>: {condition.value}</span>}
          </li>
        ))}
        <li className={styles.conditionItem}>
          Mileage: <span>{formatMileage(car.mileage)}</span>
        </li>
        <li className={styles.conditionItem}>
          Price: <span>${car.rentalPrice}</span>
        </li>
      </ul>

      <button className={styles.rentButton} onClick={handleRentClick}>
        Rent Car
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className={styles.formTitle}>Book Your Car Now</h2>
        <form className={styles.bookingForm} onSubmit={handleBookingSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            className={styles.input}
          />
          <input
            type="date"
            placeholder="Pickup Date"
            required
            className={styles.input}
          />
          <textarea
            placeholder="Additional Comments"
            className={styles.textarea}
          />
          <button type="submit" className={styles.submitButton}>
            Submit Booking
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CarDetailsPage;
