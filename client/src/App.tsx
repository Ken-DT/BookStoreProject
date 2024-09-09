import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './screens/Signin';
import Search from './screens/Search';
import BookDetails from './screens/BookDetails';
import Bookshelf from './screens/Bookshelf';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <div>
      <h1>Test Render</h1>
    
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/search" element={<Search />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
        </Route>
      </Routes>
    </Router>
    </div>
  );
};

export default App;