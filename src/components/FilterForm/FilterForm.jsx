import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBrands,
  setSelectedBrand,
  setSelectedPrice,
  setMinMileage,
  setMaxMileage,
} from '../../redux/filtersSlice';
import { getCars, resetCars } from '../../redux/carsSlice';
import sprite from '../../images/sprite.svg';
import styles from './FilterForm.module.css';

const FilterForm = () => {
  const dispatch = useDispatch();
  const { brands, selectedBrand, selectedPrice, minMileage, maxMileage } =
    useSelector((state) => state.filters);

  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const prices = Array.from({ length: 11 }, (_, i) => (i + 3) * 10);

  const handleSearch = () => {
    const params = {
      page: 1,
      limit: 8,
    };

    if (selectedBrand) params.brand = selectedBrand;
    if (selectedPrice) params.rentalPrice = selectedPrice;
    if (minMileage) params.minMileage = minMileage;
    if (maxMileage) params.maxMileage = maxMileage;

    dispatch(resetCars());
    dispatch(getCars(params));
  };

  const handleBrandSelect = (brand) => {
    dispatch(setSelectedBrand(brand));
    setShowBrandDropdown(false);
  };

  const handlePriceSelect = (price) => {
    dispatch(setSelectedPrice(price));
    setShowPriceDropdown(false);
  };

  const toggleBrandDropdown = () => {
    setShowBrandDropdown(!showBrandDropdown);
    setShowPriceDropdown(false);
  };

  const togglePriceDropdown = () => {
    setShowPriceDropdown(!showPriceDropdown);
    setShowBrandDropdown(false);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <label htmlFor="brand" className={styles.label}>
          Car brand
        </label>
        <div className={styles.selectWrapper}>
          <button
            className={styles.selectButton}
            onClick={toggleBrandDropdown}
            type="button"
          >
            {selectedBrand || 'Choose a brand'}
            <svg className={styles.selectArrow} width="16" height="16">
              <use
                href={`${sprite}#icon-arr-${showBrandDropdown ? 'up' : 'down'}`}
              />
            </svg>
          </button>

          {showBrandDropdown && (
            <div className={styles.dropdown}>
              {brands.map((brand) => (
                <div
                  key={brand}
                  className={styles.dropdownItem}
                  onClick={() => handleBrandSelect(brand)}
                >
                  {brand}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="price" className={styles.label}>
          Price / 1 hour
        </label>
        <div className={styles.selectWrapper}>
          <button
            className={styles.selectButton}
            onClick={togglePriceDropdown}
            type="button"
          >
            {selectedPrice ? `To $${selectedPrice}` : 'Choose a price'}
            <svg className={styles.selectArrow} width="16" height="16">
              <use
                href={`${sprite}#icon-arr-${showPriceDropdown ? 'up' : 'down'}`}
              />
            </svg>
          </button>

          {showPriceDropdown && (
            <div className={styles.dropdown}>
              {prices.map((price) => (
                <div
                  key={price}
                  className={styles.dropdownItem}
                  onClick={() => handlePriceSelect(price)}
                >
                  To ${price}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.filterGroup}>
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
    </div>
  );
};

export default FilterForm;
