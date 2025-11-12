import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../Store/Slices/CardsSlice';
import { Button } from '../UI/Button';
import styles from './FilterButtons.module.css';
import type { AppDispatch, RootState } from '../Store';

export const FilterButtons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentFilter = useSelector((state: RootState) => state.cards.currentFilter);
  const favorites = useSelector((state: RootState) => state.cards.favorites);
  const allCards = useSelector((state: RootState) => state.cards.items);

  return (
    <div className={styles.filters}>
      <Button
        title="Все карточки"
        className={currentFilter === 'all' ? styles.active : ''}
        clickHandler={() => dispatch(setFilter('all'))}
        cardId=""
      >Все карточки ({allCards.length})
      </Button>
      <Button
        title="Избранное"
        className={currentFilter === 'favorites' ? styles.active : ''}
        clickHandler={() => dispatch(setFilter('favorites'))}
        cardId=""
      >Избранное ({favorites.length})
      </Button>
    </div>
  );
};