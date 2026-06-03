# 📋 Google Apps Script — Инструкция по подключению

## Шаг 1: Создайте Google Таблицу

1. Откройте https://sheets.google.com
2. Создайте новую таблицу с именем **"Свадьба Айдархан & Асия"**
3. Скопируйте ID таблицы из URL (часть между /d/ и /edit)

---

## Шаг 2: Создайте Apps Script

1. В таблице: **Расширения → Apps Script**
2. Удалите весь код и вставьте следующее:

```javascript
const SPREADSHEET_ID = 'ВАШ_ID_ТАБЛИЦЫ';  // вставьте ID таблицы

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (data.type === 'rsvp') {
      let sheet = ss.getSheetByName('RSVP');
      if (!sheet) {
        sheet = ss.insertSheet('RSVP');
        sheet.appendRow(['Дата', 'Имя', 'Статус']);
        sheet.getRange('1:1').setFontWeight('bold');
      }
      sheet.appendRow([data.date, data.name, data.status]);
    }

    if (data.type === 'wish') {
      let sheet = ss.getSheetByName('Тілектер');
      if (!sheet) {
        sheet = ss.insertSheet('Тілектер');
        sheet.appendRow(['Дата', 'Имя', 'Пожелание']);
        sheet.getRange('1:1').setFontWeight('bold');
      }
      sheet.appendRow([data.date, data.name, data.text]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Шаг 3: Разверните как веб-приложение

1. Нажмите **Развернуть → Новое развертывание**
2. Тип: **Веб-приложение**
3. Выполнить как: **Я** (ваш аккаунт)
4. Доступ: **Все** (кто угодно, даже анонимно)
5. Нажмите **Развернуть**
6. Скопируйте URL вида: `https://script.google.com/macros/s/XXXXX/exec`

---

## Шаг 4: Вставьте URL в код

Откройте два файла и замените `YOUR_APPS_SCRIPT_ID`:

**src/components/RsvpSection.jsx** — строка 5:
```js
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/ВАШ_ID/exec'
```

**src/components/WishesSection.jsx** — строка 5:
```js
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/ВАШ_ID/exec'
```

---

## Деплой на хостинг

### Vercel (рекомендуется, бесплатно):
```bash
npm run build
npx vercel --prod
```

### Netlify:
```bash
npm run build
# Загрузите папку dist/ на netlify.com
```

### Локальный запуск:
```bash
npm install
npm run dev
```
