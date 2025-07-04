# Регистрационная форма на Vue 3 + Nuxt 3 + PrimeVue

## 📋 Описание проекта

Это компонент регистрационной формы, который включает:
- Валидацию полей на клиенте
- Отправку данных на сервер
- Обработку ошибок
- Успешное сообщение после регистрации
- Сохранение токенов (accessToken в store, refreshToken в cookies)

## 🛠 Технологии

- **Vue 3** (Composition API)
- **Nuxt 3**
- **PrimeVue** (UI компоненты)
- **TypeScript**
- **SCSS** (для стилей)

## 🎨 Компоненты PrimeVue

В форме используются следующие компоненты PrimeVue:
- `InputText` - текстовые поля
- `Password` - поля паролей с toggle
- `Checkbox` - чекбокс принятия условий
- `Button` - кнопка отправки
- `Message` - сообщение об успехе

## 🔐 Валидация формы

Форма включает валидацию следующих полей:

1. **Имя пользователя**:
   - Обязательное поле

2. **Email**:
   - Обязательное поле
   - Проверка формата email

3. **Пароль**:
   - Обязательное поле
   - Минимальная длина 6 символов

4. **Подтверждение пароля**:
   - Совпадение с основным паролем

5. **Условия использования**:
   - Обязательное принятие

## 🚀 Как работает

1. Пользователь заполняет форму
2. При нажатии на кнопку "Зарегистрироваться":
   - Выполняется клиентская валидация
   - Если валидация прошла, данные отправляются на сервер
   - При успехе:
     - Показывается сообщение
     - AccessToken сохраняется в Pinia store
     - RefreshToken сохраняется в cookies
   - При ошибке показывается сообщение

## 🎨 Стилизация

Форма стилизована с использованием:
- SCSS переменных
- Гибкой системы компоновки (flex)
- Адаптивного дизайна (max-width: 400px)
- Кастомных стилей для ошибок

## 📌 Особенности реализации

1. **Реактивность**:
   - Все поля формы связаны через `v-model`
   - Ошибки хранятся в реактивном объекте

2. **Валидация**:
   - Функция `validateForm()` проверяет все поля
   - Динамические классы `p-invalid` для подсветки ошибок

3. **Безопасность**:
   - Пароль скрыт по умолчанию (компонент Password)
   - RefreshToken сохраняется как Secure cookie

## 🛠 Улучшения

1. **Добавить**:
   - Загрузку состояния кнопки
   - Капчу
   - Подтверждение email

2. **Улучшить**:
   - Валидацию пароля (спецсимволы, цифры)
   - Сообщения об ошибках сервера

3. **Оптимизировать**:
   - Дебаунс для валидации на лету
   - Мемоизацию функций

## 🚀 Запуск и тестирование

1. Убедитесь, что [сервер](https://github.com/grmnche/auth-server) запущен на `http://localhost:5000`
2. Заполните форму и проверьте:
   - Валидацию полей
   - Отправку данных
   - Сохранение токенов
   - Сообщения об ошибках/успехе

## 📝 Пример запроса на сервер

```json
POST http://localhost:5000/api/auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "securepassword123",
  "confirmPassword": "securepassword123",
  "acceptTerms": true
}
```

## ✅ Успешный ответ

```json
{
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "eyJhbGciOi..."
}
```

## 🐛 Отладка

Для отладки используйте:
```javascript
console.log("response: ", response);
console.log("accessToken: ", accessToken);
```

## 📌 Важные файлы

1. `components/RegistrationForm.vue` - текущий компонент
2. `stores/accessToken.ts` - хранилище для токена
3. `server/api/auth/register` - эндпоинт регистрации

---

Это базовая, но полнофункциональная реализация регистрационной формы, которую можно расширять по мере развития проекта.
