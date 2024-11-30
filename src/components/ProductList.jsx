import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import '../index.css';

const ProductList = () => {
  const { products, searchQuery } = useSelector((state) => state.products);

  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const sortedAndPagedProducts = useMemo(() => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'rating') {
        return sortOrder === 'asc' ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate;
      }
      return 0;
    });

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    return sortedProducts.slice(startIndex, endIndex);
  }, [products, searchQuery, sortBy, sortOrder, currentPage]);

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setSortOrder('asc'); 
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); 
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setSortBy('price');
              setSortOrder('asc'); 
            }}
            className={`p-2 rounded ${
              sortBy === 'price' ? 'bg-gray-300' : 'bg-gray-100'
            } dark:bg-gray-700 dark:text-white`}
          >
            Sort by Price
          </button>

          <button
            onClick={() => {
              setSortBy('rating');
              setSortOrder('asc'); 
            }}
            className={`p-2 rounded ${
              sortBy === 'rating' ? 'bg-gray-300' : 'bg-gray-100'
            } dark:bg-gray-700 dark:text-white`}
          >
            Sort by Rating
          </button>

          <button
            onClick={toggleSortOrder}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4">
        {sortedAndPagedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

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
