import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import AllBlogs from './components/AllBlogs';
import AllProjects from './components/AllProjects';
import PriceList from './components/PriceList';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all-projects" element={<AllProjects />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/price-list" element={<PriceList />} />
        <Route path="/pricing" element={<PriceList />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
