import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './screens/Signin';
import Search from './screens/Search';
import BookDetails from './screens/BookDetails';
import Bookshelf from './screens/Bookshelf';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route element={<ProtectedRoute />}/>
          <Route path="/search" element={<Search />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
      </Routes>
      
    </Router>
  );
};
export default App;