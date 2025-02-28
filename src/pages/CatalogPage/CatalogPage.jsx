import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, resetCars } from '../../redux/carsSlice';
import CarCard from '../../components/CarCard/CarCard';
import FilterForm from '../../components/FilterForm/FilterForm';
import Loader from '../../components/Loader/Loader';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const {
    items: cars,
    loading,
    error,
    page,
    totalPages,
  } = useSelector((state) => state.cars);
  const { selectedBrand, selectedPrice, minMileage, maxMileage } = useSelector(
    (state) => state.filters,
  );

  const fetchCars = async (params) => {
    try {
      dispatch(getCars(params));
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    fetchCars({ page: 1, limit: 8 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleLoadMore = () => {
    if (page) {
      const params = {
        page: page,
        limit: 8,
      };

      if (selectedBrand) params.brand = selectedBrand;
      if (selectedPrice) params.rentalPrice = selectedPrice;
      if (minMileage) params.minMileage = minMileage;
      if (maxMileage) params.maxMileage = maxMileage;

      fetchCars(params);
    }
  };

  const handleSearch = (filters) => {
    const { brand, price, minMileage, maxMileage } = filters;

    dispatch(resetCars());

    const params = {
      page: 1,
      limit: 8,
    };

    if (brand) params.brand = brand;
    if (price) params.rentalPrice = price;
    if (minMileage) params.minMileage = minMileage;
    if (maxMileage) params.maxMileage = maxMileage;

    fetchCars(params);
  };

  return (
    <div className={styles.catalogContainer}>
      <FilterForm onSubmit={handleSearch} />

      {error && (
        <p className={styles.errorMessage}>
          Something went wrong. Please try again later.
        </p>
      )}

      {loading && cars.length === 0 && (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      )}

      {cars.length > 0 && (
        <div className={styles.carsGrid}>
          {cars.map((car, index) => (
            <CarCard key={`${car.id}-${index}`} car={car} />
          ))}
        </div>
      )}

      {cars.length > 0 && page && page <= totalPages && !loading && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}

      {cars.length === 0 && !loading && !error && (
        <p className={styles.noCarsMessage}>
          No cars found matching your criteria
        </p>
      )}
    </div>
  );
};

export default CatalogPage;
