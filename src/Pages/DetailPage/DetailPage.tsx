import styles from './DetailPage.module.css';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom"

export const DetailPage = () => {
  const { id } = useParams();
  const cards = useSelector(state => state.cards.items)
  console.log('cards', cards);
  const card = cards.find((card) => card.id === id)
  console.log('card', card);

  if (!card) {
    return (
      <div className={styles.notFound}>
        <h1>Карточка не найдена</h1>
        <p>Извините, такой карточки не существует.</p>
      </div>
    );
  }


  return (
    <div className={styles.container}>
      <article className={styles.cardDetail}>
        {/* Заголовок */}
        <header className={styles.header}>
          <h1 className={styles.title}>{card.destination}</h1>
          <div className={styles.meta}>
            <span className={styles.category}>{card.category}</span>
            <span className={styles.continent}>{card.continent}</span>
            <span className={styles[card.budget_level]}>
              Бюджет: {card.budget_level}
            </span>
            <span className={styles.priority}>Приоритет: {card.priority}/5</span>
          </div>
        </header>

        {/* Изображение */}
        <div className={styles.imageSection}>
          {card.image_url ? (
            <img
              src={card.image_url}
              alt={card.destination}
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              Изображение недоступно
            </div>
          )}
        </div>

        {/* Основное описание */}
        <section className={styles.description}>
          <h2>Описание</h2>
          <p>{card.detailed_description}</p>
        </section>

        {/* Лучшее время для посещения */}
        <section className={styles.bestTime}>
          <h2>Лучшее время для посещения</h2>
          <p>{card.best_time_to_visit}</p>
        </section>

        {/* Must See */}
        <section className={styles.mustSee}>
          <h2>Обязательно к посещению</h2>
          <ul className={styles.list}>
            {card.must_see.map((item, index) => (
              <li key={index} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Tags */}
        <footer className={styles.footer}>
          <div className={styles.tags}>
            {card.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
          <div className={styles.status}>
            {card.completed ? '✅ Посещено' : '⏳ В планах'}
          </div>
        </footer>
      </article>
    </div>
  )
}