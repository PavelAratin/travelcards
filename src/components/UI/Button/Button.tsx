import styles from './Button.module.css';

export const Button = ({ clickHandler, cardId, children, title, className = "" }) => {
  console.log('clickHandler', clickHandler);

  return (
    <button className={`${styles.button} ${className}`} onClick={() => clickHandler(cardId)} title={title}>{children}</button>
  )
}