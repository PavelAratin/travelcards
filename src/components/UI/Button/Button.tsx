import styles from './Button.module.css';

export const Button = ({ clickHandler, cardId, children, title, className = "" }) => {
  const handleClick = () => {
    if (cardId) {
      clickHandler(cardId);
    } else {
      clickHandler();
    }
  };


  return (
    <button className={`${styles.button} ${className}`} onClick={handleClick} title={title}>{children}</button>
  )
}