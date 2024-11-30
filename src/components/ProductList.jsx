import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import '../index.css';

const ProductList = () => {
  const { products, searchQuery } = useSelector((state) => state.products);

  // State for sorting criteria (price or rating)
  const [sortBy, setSortBy] = useState('price');
  // State for sorting order (ascending or descending)
  const [sortOrder, setSortOrder] = useState('asc'); // Default is ascending order
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);
  // Number of products per page
  const productsPerPage = 9;

  // Sorting and Pagination logic
  const sortedAndPagedProducts = useMemo(() => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort products based on selected criteria and order
    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'rating') {
        return sortOrder === 'asc' ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate;
      }
      return 0;
    });

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Return the paginated products
    return sortedProducts.slice(startIndex, endIndex);
  }, [products, searchQuery, sortBy, sortOrder, currentPage]);

  // Handle sorting criterion change
  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setSortOrder('asc'); // Reset to ascending order when changing the sorting criterion
  };

  // Handle sorting order toggle
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Pagination handlers
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure the page doesn't go below 1
  };

  return (
    <div>
      {/* Sorting Buttons */}
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          {/* Price Sort Button */}
          <button
            onClick={() => {
              setSortBy('price');
              setSortOrder('asc'); // Default to ascending when switching to price
            }}
            className={`p-2 rounded ${
              sortBy === 'price' ? 'bg-gray-300' : 'bg-gray-100'
            } dark:bg-gray-700 dark:text-white`}
          >
            Sort by Price
          </button>

          {/* Rating Sort Button */}
          <button
            onClick={() => {
              setSortBy('rating');
              setSortOrder('asc'); // Default to ascending when switching to rating
            }}
            className={`p-2 rounded ${
              sortBy === 'rating' ? 'bg-gray-300' : 'bg-gray-100'
            } dark:bg-gray-700 dark:text-white`}
          >
            Sort by Rating
          </button>

          {/* Toggle Sort Order Button */}
          <button
            onClick={toggleSortOrder}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4">
        {sortedAndPagedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="p-2 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-800 dark:text-gray-200">
          Page {currentPage}
        </span>

        <button
          onClick={nextPage}
          disabled={sortedAndPagedProducts.length < productsPerPage}
          className="p-2 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
