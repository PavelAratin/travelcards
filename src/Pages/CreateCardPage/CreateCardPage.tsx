import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCard } from '../../components/Store/Slices/CardsSlice';
import styles from './CreateCardPage.module.css';
import type { AppDispatch } from '../../components/Store';

interface FormData {
  destination: string;
  category: string;
  continent: string;
  short_description: string;
  image_url: string;
  budget_level: string;
  priority: string;
}

interface Errors {
  destination?: string;
  category?: string;
  continent?: string;
  short_description?: string;
  image_url?: string;
}

export const CreateCardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    destination: '',
    category: '',
    continent: '',
    short_description: '',
    image_url: '',
    budget_level: 'middle',
    priority: '3'
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

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

    if (!formData.image_url.trim()) {
      newErrors.image_url = 'Ссылка на картинку обязательна';
    } else if (!isValidUrl(formData.image_url)) {
      newErrors.image_url = 'Введите корректную ссылку';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const newCard = {
        id: Date.now().toString(),
        ...formData,
        detailed_description: formData.short_description,
        best_time_to_visit: 'круглый год',
        must_see: ['Достопримечательности'],
        activities: ['Экскурсии'],
        completed: false,
        tags: [formData.category],
        priority: formData.priority
      };

      dispatch(addCard(newCard));
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
            rows={3}
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