import styles from './Button.module.css';

interface ButtonProps {
  clickHandler: () => void;
  cardId?: string;
  children: React.ReactNode;
  title: string;
  className?: string;
}

export const Button = ({ clickHandler, children, title, className = "" }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={clickHandler} title={title}>
      {children}
    </button>
  )
}
