import styles from './Cards.module.css';
import { useEffect } from "react";
import Card from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { addImageError, getCards } from '../Store/Slices/CardsSlice';


export const Cards = () => {
  const dispatch = useDispatch();
  const { items: cards, isLoading, error, imageSrcError } = useSelector((state) => state.cards);
  const imageErrorSet = new Set(imageSrcError);


  const imageErrorHandler = (cardId) => {
    dispatch(addImageError(cardId));
  };
  useEffect(() => { dispatch(getCards()) }, [dispatch])
  if (isLoading) return <div>Загрузка карточек...</div>
  if (error) return <div>Ошибка:{error}</div>
  return (
    <ul className={styles.cardsList}>
      {cards.map((card) => (
        <Card key={card.id} card={card} imageErrorHandler={imageErrorHandler} imageSrcError={imageErrorSet}></Card>
      ))}
    </ul>
  )
}