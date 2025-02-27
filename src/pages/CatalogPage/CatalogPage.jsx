import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars } from '../../redux/carsSlice';
import CarCard from '../../components/CarCard/CarCard';
import FilterForm from '../../components/FilterForm/FilterForm';
import Loader from '../../components/Loader/Loader';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const {
    items: cars,
    loading,
    page,
    totalPages,
  } = useSelector((state) => state.cars);
  const { selectedBrand, selectedPrice, minMileage, maxMileage } = useSelector(
    (state) => state.filters,
  );

  useEffect(() => {
    dispatch(getCars({ page: 1, limit: 8 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    const params = {
      page: page + 1,
      limit: 8,
    };

    if (selectedBrand) params.brand = selectedBrand;
    if (selectedPrice) params.rentalPrice = selectedPrice;
    if (minMileage) params.minMileage = minMileage;
    if (maxMileage) params.maxMileage = maxMileage;

    dispatch(getCars(params));
  };

  return (
    <div className={styles.catalogContainer}>
      <h1 className={styles.title}>Catalog</h1>

      <FilterForm />

      {loading && cars.length === 0 ? (
        <Loader />
      ) : cars.length > 0 ? (
        <>
          <div className={styles.carsGrid}>
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {page < totalPages && (
            <button
              className={styles.loadMoreButton}
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load more'}
            </button>
          )}
        </>
      ) : (
        <p className={styles.noCarsMessage}>
          No cars found matching your criteria
        </p>
      )}
    </div>
  );
};

export default CatalogPage;
