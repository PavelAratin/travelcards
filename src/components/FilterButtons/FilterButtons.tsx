import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../Store/Slices/CardsSlice';
import { Button } from '../UI/Button';
import styles from './FilterButtons.module.css';

export const FilterButtons = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(state => state.cards.currentFilter);
  const favorites = useSelector(state => state.cards.favorites);
  const allCards = useSelector(state => state.cards.items);

  return (
    <div className={styles.filters}>
      <Button
        title="Все карточки"
        className={currentFilter === 'all' ? styles.active : ''}
        clickHandler={() => dispatch(setFilter('all'))}
      >Все карточки ({allCards.length})
      </Button>
      <Button
        title="Избранное"
        className={currentFilter === 'favorites' ? styles.active : ''}
        clickHandler={() => dispatch(setFilter('favorites'))}
      >Избранное ({favorites.length})
      </Button>
    </div>
  );
};