import styles from './Cards.module.css';
import { useEffect } from "react";
import Card from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { addImageError, getCards } from '../Store/Slices/CardsSlice';
import type { AppDispatch, RootState } from '../Store';

export const Cards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: cards, isLoading, error, imageSrcError, favorites, currentFilter } = useSelector((state: RootState) => state.cards);
  const imageErrorSet = new Set(imageSrcError);

  const imageErrorHandler = (cardId: string) => {
    dispatch(addImageError(cardId));
  };

  useEffect(() => {
    if (cards.length === 0) {
      dispatch(getCards());
    }
  }, [dispatch, cards.length])

  const filteredCards = currentFilter === 'favorites'
    ? cards.filter(card => favorites.includes(card.id))
    : cards;

  if (isLoading) return <div>Загрузка карточек...</div>
  if (error) return <div>Ошибка:{error}</div>

  console.log('Все карточки в Redux:', cards);
  console.log('Текущий фильтр:', currentFilter);
  console.log('Избранные ID:', favorites);

  return (
    <>
      <ul className={styles.cardsList}>
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            imageErrorHandler={imageErrorHandler}
            imageSrcError={imageErrorSet}
          />
        ))}
      </ul>
      {currentFilter === 'favorites' && filteredCards.length === 0 && (
        <div className={styles.emptyMessage}>
          <h3>В избранном пока ничего нет</h3>
          <p>Нажмите на ❤️ в карточке, чтобы добавить её в избранное</p>
        </div>
      )}
      {currentFilter === 'all' && filteredCards.length === 0 && (
        <div className={styles.emptyMessage}>
          <h3>Карточки не найдены</h3>
          <p>Попробуйте обновить страницу или добавить новые карточки</p>
        </div>
      )}
    </>
  )
}