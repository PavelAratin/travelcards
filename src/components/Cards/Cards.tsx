import styles from './Cards.module.css';
import { useEffect, useState } from "react";
import { API_URL } from "../../Constans"
import Card from '../Card/Card';


export const Cards = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Храним ID карточек, у которых не загрузились изображения
  const [imageSrcError, setImageSrcError] = useState(new Set());

  const imageErrorHandler = (cardId) => {
    setImageSrcError((prev) => {
      const newErrors = new Set(prev);
      newErrors.add(cardId);
      return newErrors;
    });
  }
  const getCards = async function () {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}/travel_cards`);
      if (!response.ok) {
        throw new Error("Карточки мест для путешествий не загрузились");
      }
      const allCards = await response.json();
      setCards(allCards);
      console.log('allCards', allCards);
    } catch (err) {
      setError(err.message);
    } finally { setIsLoading(false) }
  }
  useEffect(() => { getCards() }, [])
  if (isLoading) return <div>Загрузка карточек...</div>
  if (error) return <div>Ошибка:{error}</div>
  return (
    <ul className={styles.cardsList}>
      {cards.map((card) => (
        <Card card={card} imageErrorHandler={imageErrorHandler} imageSrcError={imageSrcError}></Card>
      ))}
    </ul>
  )
}