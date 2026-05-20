import { Routes, Route } from 'react-router-dom';
import MainLayout     from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import Home           from './pages/Home';
import Login          from './pages/Login';
import Register       from './pages/Register';
import AircraftListing from './pages/AircraftListing';
import AircraftDetails from './pages/AircraftDetails';
import Categories     from './pages/Categories';
import Cart           from './pages/Cart';
import Checkout       from './pages/Checkout';
import Orders         from './pages/Orders';
import OrderDetails   from './pages/OrderDetails';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/"             element={<Home />} />
        <Route path="/login"        element={<Login />} />
        <Route path="/register"     element={<Register />} />
        <Route path="/aircraft"     element={<AircraftListing />} />
        <Route path="/aircraft/:id" element={<AircraftDetails />} />
        <Route path="/categories"   element={<Categories />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart"        element={<Cart />} />
          <Route path="/checkout"    element={<Checkout />} />
          <Route path="/orders"      element={<Orders />} />
          <Route path="/orders/:id"  element={<OrderDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}