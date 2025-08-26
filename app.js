// app.js
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./database.js');
const app = express();
const port = 3000;

// Настройки
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // чтобы читать данные из форм
app.use(express.static('public')); // чтобы отдавать стили и скрипты

// Главная страница
app.get('/', (req, res) => {
  res.render('index'); // покажет views/index.ejs
});

// Страница регистрации
app.get('/register', (req, res) => {
  res.render('register');
});

// Обработка формы регистрации
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Шифруем пароль
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
      if (err) {
        // Если ошибка (например, юзернейм занят)
        return res.send('Ошибка регистрации: такой username уже есть, брателло.');
      }
      res.redirect('/login'); // После успешной регистрации - на логин
    });
  } catch {
    res.redirect('/register');
  }
});

// Страница логина
app.get('/login', (req, res) => {
  res.render('login');
});

// Обработка формы логина
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err || !user) {
      return res.send('Неверный логин, брателло!');
    }
    // Сравниваем введенный пароль с хэшем из БД
    if (await bcrypt.compare(password, user.password)) {
      // Успешный логин! (Здесь потом добавим сессию)
      res.redirect(`/profile/${user.id}`); // Перебрасываем на страницу профиля
    } else {
      res.send('Неверный пароль, ёбана!');
    }
  });
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`GopStream слушает порт ${port}, брателло! АУЕ!`);
});