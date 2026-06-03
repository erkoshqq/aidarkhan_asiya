# 💍 Айдархан & Асия — Свадебное приглашение

Премиальный цифровой wedding invitation на React + Vite + Tailwind CSS + Framer Motion.

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте http://localhost:5173

## Сборка для продакшна

```bash
npm run build
npm run preview
```

## Структура проекта

```
src/
├── components/
│   ├── SplashScreen.jsx     # Заставка с частицами
│   ├── Header.jsx           # Хедер + переключатель языка
│   ├── MusicButton.jsx      # Кнопка музыки
│   ├── HeroSection.jsx      # Главный экран
│   ├── QuoteSection.jsx     # Цитата
│   ├── InvitationSection.jsx # Приглашение
│   ├── HostsSection.jsx     # Той иелері
│   ├── CountdownSection.jsx # Обратный отсчёт
│   ├── LocationSection.jsx  # Локация + карта
│   ├── RsvpSection.jsx      # RSVP форма
│   ├── WishesSection.jsx    # Пожелания
│   └── Footer.jsx           # Футер
├── hooks/
│   ├── useLang.js           # Двуязычность
│   ├── useCountdown.js      # Таймер
│   └── useMusic.js          # Музыка (Web Audio API)
└── i18n/
    └── translations.js      # Переводы KK / RU
```

## Подключение Google Sheets

Смотрите файл `GOOGLE_SHEETS_SETUP.md` — пошаговая инструкция.

## Настройка

- Переводы: `src/i18n/translations.js`
- Цвета: `tailwind.config.js`
- Google Script URL: `src/components/RsvpSection.jsx` и `WishesSection.jsx`
