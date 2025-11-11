import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCard } from '../../components/Store/Slices/CardsSlice';
import styles from './CreateCardPage.module.css';

// Pages/CreateCardPage.jsx
export const CreateCardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Состояние формы - ДОБАВЛЯЕМ image_url
  const [formData, setFormData] = useState({
    destination: '',
    category: '',
    continent: '',
    short_description: '',
    image_url: '', // НОВОЕ ПОЛЕ
    budget_level: 'middle',
    priority: '3'
  });

  // Состояние ошибок - ДОБАВЛЯЕМ image_url
  const [errors, setErrors] = useState({});

  // Обработчик изменений в форме (остается без изменений)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Обновляем валидацию - ДОБАВЛЯЕМ ПРОВЕРКУ ССЫЛКИ
  const validateForm = () => {
    const newErrors = {};

    if (!formData.destination.trim()) {
      newErrors.destination = 'Название обязательно';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Категория обязательна';
    }

    if (!formData.continent.trim()) {
      newErrors.continent = 'Континент обязателен';
    }

    if (!formData.short_description.trim()) {
      newErrors.short_description = 'Описание обязательно';
    } else if (formData.short_description.length < 10) {
      newErrors.short_description = 'Описание должно быть не менее 10 символов';
    }

    // НОВАЯ ВАЛИДАЦИЯ ДЛЯ ССЫЛКИ НА КАРТИНКУ
    if (!formData.image_url.trim()) {
      newErrors.image_url = 'Ссылка на картинку обязательна';
    } else if (!isValidUrl(formData.image_url)) {
      newErrors.image_url = 'Введите корректную ссылку';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ФУНКЦИЯ ДЛЯ ПРОВЕРКИ ССЫЛКИ
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Обработчик отправки формы - УБИРАЕМ ДЕФОЛТНУЮ КАРТИНКУ
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Создаем новую карточку - ИСПОЛЬЗУЕМ ВВЕДЕННУЮ ССЫЛКУ
      const newCard = {
        id: Date.now().toString(),
        ...formData,
        detailed_description: formData.short_description,
        best_time_to_visit: 'круглый год',
        // image_url: formData.image_url, // УЖЕ В formData
        must_see: ['Достопримечательности'],
        activities: ['Экскурсии'],
        completed: false,
        tags: [formData.category],
        priority: parseInt(formData.priority) // преобразуем в число
      };

      // Добавляем в Redux
      dispatch(addCard(newCard));

      // Переходим на главную страницу
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Создать новую карточку</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Название места *</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className={errors.destination ? styles.error : ''}
          />
          {errors.destination && <span className={styles.errorText}>{errors.destination}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Категория *</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? styles.error : ''}
          />
          {errors.category && <span className={styles.errorText}>{errors.category}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Континент *</label>
          <input
            type="text"
            name="continent"
            value={formData.continent}
            onChange={handleChange}
            className={errors.continent ? styles.error : ''}
          />
          {errors.continent && <span className={styles.errorText}>{errors.continent}</span>}
        </div>

        {/* НОВОЕ ПОЛЕ ДЛЯ ССЫЛКИ НА КАРТИНКУ */}
        <div className={styles.formGroup}>
          <label>Ссылка на картинку *</label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={errors.image_url ? styles.error : ''}
          />
          {errors.image_url && <span className={styles.errorText}>{errors.image_url}</span>}
          <small style={{ color: '#666', fontSize: '12px' }}>
            Вставьте прямую ссылку на изображение
          </small>
        </div>

        <div className={styles.formGroup}>
          <label>Краткое описание *</label>
          <textarea
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            rows="3"
            className={errors.short_description ? styles.error : ''}
          />
          {errors.short_description && <span className={styles.errorText}>{errors.short_description}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Уровень бюджета</label>
          <select
            name="budget_level"
            value={formData.budget_level}
            onChange={handleChange}
          >
            <option value="low">Низкий</option>
            <option value="middle">Средний</option>
            <option value="higher">Высокий</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Приоритет</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="1">1 - Низкий</option>
            <option value="2">2</option>
            <option value="3">3 - Средний</option>
            <option value="4">4</option>
            <option value="5">5 - Высокий</option>
          </select>
        </div>

        <div className={styles.buttons}>
          <button type="submit" className={styles.submitButton}>
            Создать карточку
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className={styles.cancelButton}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};