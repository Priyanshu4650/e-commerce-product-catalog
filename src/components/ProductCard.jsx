import React from 'react';

const ProductCard = React.memo(({ product }) => (
  <div className="p-4 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 border rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <img
      src={product.image}
      alt={product.title}
      className="h-40 w-full object-contain bg-gray-100 dark:bg-gray-700 rounded"
    />
    <div className="mt-2">
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Price: ${product.price}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Rating: {product.rating.rate}⭐</p>
    </div>
  </div>
));

export default ProductCard;
