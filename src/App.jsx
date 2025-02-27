import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';

// Lazy loading для сторінок
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));
const CarDetailsPage = lazy(() =>
  import('./pages/CarDetailsPage/CarDetailsPage'),
);

function App() {
  return (
    <Router>
      <Header />
      <Suspense
        fallback={
          <div className="container">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CarDetailsPage />} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
