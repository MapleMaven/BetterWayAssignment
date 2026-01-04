import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleIncrease = (item) => {
    if (item.quantity < item.stock) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.cart}>
        <h2 className={styles.title}>Shopping Cart</h2>
        <div className={styles.empty}>
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h2 className={styles.title}>Shopping Cart ({totalItems} items)</h2>
      
      <div className={styles.items}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <img src={item.thumbnail} alt={item.title} className={styles.image} />
            
            <div className={styles.details}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.price}>${item.price.toFixed(2)} each</p>
            </div>
            
            <div className={styles.controls}>
              <button 
                onClick={() => handleDecrease(item)}
                className={styles.controlButton}
              >
                -
              </button>
              <span className={styles.quantity}>{item.quantity}</span>
              <button 
                onClick={() => handleIncrease(item)}
                className={styles.controlButton}
                disabled={item.quantity >= item.stock}
              >
                +
              </button>
            </div>
            
            <div className={styles.subtotal}>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <button 
                onClick={() => removeFromCart(item.id)}
                className={styles.removeButton}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Total Items:</span>
          <span className={styles.summaryValue}>{totalItems}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Total Price:</span>
          <span className={styles.summaryValue}>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
