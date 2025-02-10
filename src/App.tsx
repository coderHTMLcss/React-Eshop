import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ProductCardDetail from './components/ProductCardDetail';
import PopularBlogs from './components/PopularBlogs';
import TopSellers from './components/TopSellers';

function App() {
  return (
    <Router>
      <div className='flex h-screen'>
        <Sidebar />
        <div className='rounded w-max flex justify-center flex-wrap'>
          <Routes>
            <Route path='/' element={<MainContent />} />
            <Route path="/product/:id" element={<ProductCardDetail />} />
          </Routes>
        </div>
        <div>
          <PopularBlogs />
          <TopSellers />
        </div>
      </div>
    </Router>
  )
}

export default App
