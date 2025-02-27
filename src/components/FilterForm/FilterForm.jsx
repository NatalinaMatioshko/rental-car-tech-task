import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBrands,
  setSelectedBrand,
  setSelectedPrice,
  setMinMileage,
  setMaxMileage,
  resetFilters,
} from '../../redux/filtersSlice';
import { getCars, resetCars } from '../../redux/carsSlice';
import styles from './FilterForm.module.css';

const FilterForm = () => {
  const dispatch = useDispatch();
  const { brands, selectedBrand, selectedPrice, minMileage, maxMileage } =
    useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const prices = Array.from({ length: 11 }, (_, i) => (i + 3) * 10); // Ціни від 30 до 130 з кроком 10

  const handleSearch = () => {
    const params = {
      page: 1,
      limit: 8, // Задаємо обмеження на кількість авто на сторінці
    };

    if (selectedBrand) params.brand = selectedBrand;
    if (selectedPrice) params.rentalPrice = selectedPrice;
    if (minMileage) params.minMileage = minMileage;
    if (maxMileage) params.maxMileage = maxMileage;

    dispatch(resetCars());
    dispatch(getCars(params));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(resetCars());
    dispatch(getCars({ page: 1, limit: 8 }));
  };

  return (
    <div className={styles.filterContainer}>
      <div>
        <label htmlFor="brand" className={styles.label}>
          Car brand
        </label>
        <select
          id="brand"
          className={styles.select}
          value={selectedBrand}
          onChange={(e) => dispatch(setSelectedBrand(e.target.value))}
        >
          <option value="">Choose a brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="price" className={styles.label}>
          Price / 1 hour
        </label>
        <select
          id="price"
          className={styles.select}
          value={selectedPrice}
          onChange={(e) => dispatch(setSelectedPrice(e.target.value))}
        >
          <option value="">Choose a price</option>
          {prices.map((price) => (
            <option key={price} value={price}>
              To ${price}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={styles.label}>Car mileage / km</label>
        <div className={styles.mileageContainer}>
          <input
            className={`${styles.input} ${styles.leftInput}`}
            placeholder="From"
            value={minMileage}
            onChange={(e) => dispatch(setMinMileage(e.target.value))}
            type="number"
          />
          <input
            className={`${styles.input} ${styles.rightInput}`}
            placeholder="To"
            value={maxMileage}
            onChange={(e) => dispatch(setMaxMileage(e.target.value))}
            type="number"
          />
        </div>
      </div>

      <button className={styles.primaryButton} onClick={handleSearch}>
        Search
      </button>

      <button className={styles.secondaryButton} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default FilterForm;
