import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { choiceBudget } from '../Helpers/Helpers';
import { Button } from '../UI/Button';
import { deleteCard, toggleFavorites, toggleLike } from '../Store/Slices/CardsSlice';
import { Favorites } from '../UI/Icons/Favorites';
import { Delete } from '../UI/Icons/Delete';
import styles from './Card.module.css';
import { Like } from '../UI/Icons/Like';

interface CardType {
  id: string;
  image_url: string;
  destination: string;
  short_description: string;
  continent: string;
  budget_level: string;
  priority: string;
}

interface CardProps {
  card: CardType;
  imageErrorHandler: (id: string) => void;
  imageSrcError: Set<string>;
}

interface RootState {
  cards: {
    likes: string[];
    favorites: string[];
  };
}

const Card = ({ card, imageErrorHandler, imageSrcError }: CardProps) => {
  const dispatch = useDispatch();
  const likes = useSelector((state: RootState) => state.cards.likes);
  const favorites = useSelector((state: RootState) => state.cards.favorites);
  const isLiked = likes.includes(card.id);
  const isFavorite = favorites.includes(card.id);

  const likeHandler = () => {
    dispatch(toggleLike(card.id));
  };

  const deleteCardHandler = () => {
    dispatch(deleteCard(card.id))
  }

  const toggleFavoritesHandler = () => {
    dispatch(toggleFavorites(card.id))
  }

  const showImage = imageSrcError.has(card.id);

  return (
    <li key={card.id} className={styles.cardItem}>
      <div className={styles.cardContent}>
        {showImage ? (
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
      <Link className={styles.cardLink} to={`/product/${card.id}`}>
      </Link>
      <Button clickHandler={toggleFavoritesHandler} title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"} className={`${styles.favorites} ${isFavorite ? styles.favorited : ''}`}><Favorites></Favorites></Button>
      <Button clickHandler={deleteCardHandler} title="Удалить карточку" className={styles.delete}><Delete></Delete></Button>
      <Button clickHandler={likeHandler} title={isLiked ? "Убрать лайк" : "Поставить лайк"} className={`${styles.like} ${isLiked ? styles.liked : ''}`}><Like></Like></Button>
    </li>
  )
}

export default Card;
