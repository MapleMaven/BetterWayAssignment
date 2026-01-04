import { memo } from 'react';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { title, price, stock, category, thumbnail, id } = product;
  const { cartItems, addToCart } = useCart();

  const cartItem = cartItems.find(item => item.id === id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const canAddToCart = stock > 0 && quantityInCart < stock;

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    addToCart(product);
    alert(`${title} added to cart!`);
  };

  return (
    <div className={styles.card}>
      <img src={thumbnail} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.category}>{category}</p>
        <div className={styles.details}>
          <p className={styles.price}>${price.toFixed(2)}</p>
          <p className={styles.stock}>
            Stock: {stock}
            {quantityInCart > 0 && ` (${quantityInCart} in cart)`}
          </p>
        </div>
        <button 
          className={styles.button}
          onClick={handleAddToCart}
          disabled={!canAddToCart}
        >
          {stock === 0 ? 'Out of Stock' : 
           quantityInCart >= stock ? 'Max in Cart' : 
           'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default memo(ProductCard);
