import { choiceBudget } from '../Helpers/Helpers';
import styles from './Card.module.css';

const Card = ({ card, imageErrorHandler, imageSrcError }) => {

  return (
    <li key={card.id} className={styles.cardItem}>
      <div className={styles.cardContent}>
        {imageSrcError.has(card.id) ? (
          <div className={styles.imagePlaceholder}>
            Изображение недоступно
          </div>
        ) : (
          <img
            src={card.image_url}
            alt={card.destination}
            className={styles.cardImage}
            onError={() => imageErrorHandler(card.id)}
          />
        )}
        <h3 className={styles.cardTitle}>{card.destination}</h3>
        <p className={styles.cardDescription}>{card.short_description}</p>
        <div className={styles.cardMeta}>
          <div>{card.continent}</div>
          <div className={styles[card.budget_level]}>Уровень бюджета: {choiceBudget(card.budget_level)}</div>
          <div>Приоритет: {card.priority}</div>
        </div>
      </div>
    </li>
  )
}


export default Card;