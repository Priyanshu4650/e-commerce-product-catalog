import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/productsSlice';

const SearchBar = () => {
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      placeholder="Search products..."
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      className="w-full p-2 border rounded-md bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 transition"
    />
  );
};

export default SearchBar;
