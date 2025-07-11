import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import AllProjects from './components/AllProjects';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all-projects" element={<AllProjects />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
