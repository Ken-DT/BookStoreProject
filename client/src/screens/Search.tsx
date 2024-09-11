import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { searchBooks } from '../services/api'; // Import the search API function

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // State for the search query
  const [books, setBooks] = useState<any[]>([]); // State for search results
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission refresh
    setError(null); // Reset any previous error
    if (!query.trim()) {
      setError('Please enter a search query.'); // Handle empty query
      return;
    }

    try {
      const result = await searchBooks(query); // Call the searchBooks API function
      setBooks(result); // Set the books data in the state
    } catch (err) {
      setError('Failed to fetch books. Please try again.'); // Handle errors
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h1 className="text-center">Search for Books</h1>

          {/* Search Form */}
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="searchQuery">
              <Form.Label>Enter book title or author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search for books..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 w-100">
              Search
            </Button>
          </Form>

          {/* Display error message if any */}
          {error && <p className="text-danger mt-3">{error}</p>}

          {/* Display search results */}
          <div className="mt-5">
            {books.length > 0 ? (
              <Row>
                {books.map((book, index) => (
                  <Col xs={12} md={4} key={index} className="mb-3">
                    <div className="border p-3">
                      <h5>{book.volumeInfo.title}</h5>
                      <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
                      {book.volumeInfo.imageLinks?.thumbnail && (
                        <img
                          src={book.volumeInfo.imageLinks.thumbnail}
                          alt={book.volumeInfo.title}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="text-center">No books found.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;