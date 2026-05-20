/**
 * BabaFly Mock API Service Layer
 * Simulates real backend API calls with async delays, loading states, and error handling.
 * When a real backend is available, just replace the implementations with actual axios calls.
 */
import axiosInstance from '../utils/axiosInstance';
import { AIRCRAFT, getAircraftById } from '../utils/mockData';

const delay = (ms = 600) => new Promise(r => setTimeout(r, ms + Math.random() * 400));

/* ─── Auth APIs ─────────────────────────────────── */
export const authAPI = {
  async login({ email, password }) {
    await delay(800);
    if (!email || !password) throw { message: 'Email and password are required.' };
    return { user: { name: email.split('@')[0], email }, token: 'jwt-' + Date.now() };
  },
  async register({ name, email, password }) {
    await delay(900);
    if (!name || !email || !password) throw { message: 'All fields are required.' };
    return { user: { name, email }, token: 'jwt-' + Date.now() };
  },
};

/* ─── Categories APIs ───────────────────────────── */
export const CATEGORIES = [
  { id: 'ultra-long-range', name: 'Ultra Long Range', description: 'Intercontinental non-stop range exceeding 7,000nm', count: 0 },
  { id: 'long-range', name: 'Long Range', description: 'Transcontinental range of 4,500–7,000nm', count: 0 },
  { id: 'large-cabin', name: 'Large Cabin', description: 'Spacious cabin with 3,000–4,500nm range', count: 0 },
  { id: 'super-mid-size', name: 'Super Mid-Size', description: 'Optimal balance of range and comfort', count: 0 },
  { id: 'light-jet', name: 'Light Jet', description: 'Efficient short-haul jets under 2,500nm', count: 0 },
];
// Compute counts from actual data
CATEGORIES.forEach(c => { c.count = AIRCRAFT.filter(a => a.class === c.name).length; });

export const categoriesAPI = {
  async getAll() {
    await delay(500);
    return CATEGORIES;
  },
  async getBySlug(slug) {
    await delay(400);
    const cat = CATEGORIES.find(c => c.id === slug);
    if (!cat) throw { message: 'Category not found.' };
    const products = AIRCRAFT.filter(a => a.class === cat.name);
    return { category: cat, products };
  },
};

/* ─── Products (Aircraft) APIs ──────────────────── */
export const productsAPI = {
  async getAll({ page = 1, limit = 6, search = '', category = '', minPrice = 0, maxPrice = Infinity, sort = 'latest', manufacturer = '' } = {}) {
    await delay(700);
    let results = [...AIRCRAFT];
    if (search) results = results.filter(a => `${a.name} ${a.manufacturer} ${a.class}`.toLowerCase().includes(search.toLowerCase()));
    if (category && category !== 'All Aircraft') results = results.filter(a => a.class === category);
    if (manufacturer && manufacturer !== 'Any Manufacturer') results = results.filter(a => a.manufacturer === manufacturer);
    if (minPrice > 0) results = results.filter(a => a.charterRate >= minPrice);
    if (maxPrice < Infinity) results = results.filter(a => a.charterRate <= maxPrice);
    // Sorting
    switch (sort) {
      case 'price-asc':  results.sort((a, b) => a.charterRate - b.charterRate); break;
      case 'price-desc': results.sort((a, b) => b.charterRate - a.charterRate); break;
      case 'rating':     results.sort((a, b) => b.rating - a.rating); break;
      case 'range':      results.sort((a, b) => b.rangeNum - a.rangeNum); break;
      default:           results.sort((a, b) => b.year - a.year); break;
    }
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const paginated = results.slice((page - 1) * limit, page * limit);
    return { products: paginated, total, page, totalPages, limit };
  },
  async getById(id) {
    await delay(500);
    const product = getAircraftById(id);
    if (!product) throw { message: 'Aircraft not found.' };
    return product;
  },
  async search(query) {
    await delay(400);
    return AIRCRAFT.filter(a => `${a.name} ${a.manufacturer}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  },
};

/* ─── Orders APIs ───────────────────────────────── */
let mockOrders = [
  { id: 'ORD-2024-001', aircraft: 'Gulfstream G700', aircraftId: 'g700', route: 'LHR → DXB', date: 'Oct 24, 2024', status: 'confirmed', total: 90450, passengers: 4, from: 'LHR', fromCity: 'London', to: 'DXB', toCity: 'Dubai', flightTime: '6h 45m', passengerName: 'Alexander Sterling', passengerEmail: 'alex@sterling.com', address: '42 Mayfair Lane, London W1K', paymentMethod: 'Corporate Amex ••••4092' },
  { id: 'ORD-2024-002', aircraft: 'Dassault Falcon 10X', aircraftId: 'falcon10x', route: 'CDG → JFK', date: 'Nov 02, 2024', status: 'completed', total: 76600, passengers: 2, from: 'CDG', fromCity: 'Paris', to: 'JFK', toCity: 'New York', flightTime: '7h 20m', passengerName: 'Alexander Sterling', passengerEmail: 'alex@sterling.com', address: '42 Mayfair Lane, London W1K', paymentMethod: 'Personal Visa ••••8817' },
  { id: 'ORD-2024-003', aircraft: 'Bombardier Global 7500', aircraftId: 'global7500', route: 'LHR → SIN', date: 'Nov 20, 2024', status: 'pending', total: 63200, passengers: 6, from: 'LHR', fromCity: 'London', to: 'SIN', toCity: 'Singapore', flightTime: '12h 10m', passengerName: 'Alexander Sterling', passengerEmail: 'alex@sterling.com', address: '42 Mayfair Lane, London W1K', paymentMethod: 'Corporate Amex ••••4092' },
];

export const ordersAPI = {
  async getAll() {
    await delay(700);
    return [...mockOrders];
  },
  async getById(orderId) {
    await delay(500);
    const order = mockOrders.find(o => o.id === orderId);
    if (!order) throw { message: 'Order not found.' };
    const aircraft = getAircraftById(order.aircraftId);
    return { ...order, aircraftData: aircraft || null };
  },
  async create(orderData) {
    await delay(1200);
    const newOrder = {
      id: 'ORD-' + Date.now(),
      ...orderData,
      status: 'confirmed',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    mockOrders = [newOrder, ...mockOrders];
    return newOrder;
  },
};

/* ─── Cart APIs (frontend state, but structured like API) ── */
export const cartAPI = {
  async getCart() {
    await delay(200);
    return JSON.parse(localStorage.getItem('babafly_cart') || '[]');
  },
  async syncCart(items) {
    await delay(200);
    localStorage.setItem('babafly_cart', JSON.stringify(items));
    return items;
  },
};
