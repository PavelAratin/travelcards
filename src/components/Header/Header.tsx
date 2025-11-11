import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Места для путешествий</h1>
      <div className={styles.container}>
        <Link to="/" className="logo">
          🌍 Travel Explorer
        </Link>

        <nav className="navigation">
          <Link to="/create">Создать карточку</Link>
        </nav>
      </div>
    </header>
  );
};
