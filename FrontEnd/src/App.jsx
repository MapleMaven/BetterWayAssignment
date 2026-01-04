import { useState } from 'react'
import './App.css'
import { useProducts } from './hooks/useProducts'
import ProductCard from './components/ProductCard'

function App() {
  const { products, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Product Catalog</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default App
