import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:barcode" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
