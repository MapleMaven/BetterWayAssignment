import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { title, price, stock, category, thumbnail } = product;

  return (
    <div className={styles.card}>
      <img src={thumbnail} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.category}>{category}</p>
        <div className={styles.details}>
          <p className={styles.price}>${price.toFixed(2)}</p>
          <p className={styles.stock}>Stock: {stock}</p>
        </div>
        <button className={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
