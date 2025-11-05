import styles from './Cards.module.css';
import { useEffect, useState } from "react";
import { API_URL } from "../../Constans"


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
        <li key={card.id} className={styles.cardItem}>
          <div className={styles.cardContent}>
            {imageSrcError.has(card.id) ? (
              // Если изображение не загрузилось - показываем плейсхолдер
              <div className={styles.imagePlaceholder}>
                Изображение недоступно
              </div>
            ) : (
              // Если ошибки нет - пытаемся показать изображение
              <img
                src={card.image_url}
                alt={card.destination}
                className={styles.cardImage}
                // 🎯 ОБРАБОТЧИК ОШИБКИ: вызывается если изображение не загружается
                onError={() => imageErrorHandler(card.id)}
                // 🎯 ДОПОЛНИТЕЛЬНО: обработчик загрузки для лучшего UX
                onLoad={() => console.log(`Изображение ${card.destination} загружено`)}
              />
            )}
            <h3 className={styles.cardTitle}>{card.destination}</h3>
            <p className={styles.cardDescription}>{card.short_description}</p>
            <div className={styles.cardMeta}>
              <div>{card.continent}</div>
              <div className={styles[card.budget_level]}>Уровень бюджета: {card.budget_level}</div>
              <div>Приоритет: {card.priority}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}