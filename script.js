// Функция для регистрации
function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Брателло, заполни все поля, не будь котом!');
        return;
    }
    
    // Сохраняем пользователя в localStorage
    localStorage.setItem('user', JSON.stringify({ username, password }));
    localStorage.setItem('links', JSON.stringify([]));
    
    alert('Аккаунт создан, добро пожаловать в банду!');
    showProfile();
}

// Функция для входа
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Брателло, заполни все поля!');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.username === username && user.password === password) {
        alert('Приветствую, братишка!');
        showProfile();
    } else {
        alert('Неверный логин или пароль, брателло!');
    }
}

// Показать профиль
function showProfile() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
    
    // Загружаем ссылки
    loadLinks();
}

// Добавление ссылки
function addLink() {
    const linkInput = document.getElementById('linkInput');
    const url = linkInput.value.trim();
    
    if (!url) {
        alert('Брателло, ты забыл вставить ссылку!');
        return;
    }
    
    // Проверяем URL
    try {
        new URL(url);
    } catch (e) {
        alert('Это не похоже на ссылку, братишка!');
        return;
    }
    
    // Получаем текущие ссылки
    const links = JSON.parse(localStorage.getItem('links') || '[]');
    links.push(url);
    
    // Сохраняем обновленный список
    localStorage.setItem('links', JSON.stringify(links));
    
    // Очищаем поле ввода
    linkInput.value = '';
    
    // Обновляем список
    loadLinks();
}

// Загрузка ссылок
function loadLinks() {
    const linksList = document.getElementById('linksList');
    const links = JSON.parse(localStorage.getItem('links') || '[]');
    
    linksList.innerHTML = '';
    
    links.forEach((link, index) => {
        const li = document.createElement('li');
        li.className = 'link-item';
        
        // Определяем иконку в зависимости от домена
        let iconClass = 'default';
        let iconCode = '<i class="fas fa-link"></i>';
        
        if (link.includes('youtube.com') || link.includes('youtu.be')) {
            iconClass = 'youtube';
            iconCode = '<i class="fab fa-youtube"></i>';
        } else if (link.includes('vk.com')) {
            iconClass = 'vk';
            iconCode = '<i class="fab fa-vk"></i>';
        } else if (link.includes('spotify.com')) {
            iconClass = 'spotify';
            iconCode = '<i class="fab fa-spotify"></i>';
        } else if (link.includes('music.yandex')) {
            iconClass = 'yandex';
            iconCode = '<i class="fab fa-yandex"></i>';
        }
        
        li.innerHTML = `
            <div class="link-icon ${iconClass}">${iconCode}</div>
            <a href="${link}" target="_blank" class="link-url">${link}</a>
            <button class="delete-btn" onclick="deleteLink(${index})"><i class="fas fa-trash"></i></button>
        `;
        
        linksList.appendChild(li);
    });
}

// Удаление ссылки
function deleteLink(index) {
    const links = JSON.parse(localStorage.getItem('links') || '[]');
    links.splice(index, 1);
    localStorage.setItem('links', JSON.stringify(links));
    loadLinks();
}

// Проверяем, авторизован ли пользователь при загрузке
window.onload = function() {
    const user = localStorage.getItem('user');
    if (user) {
        showProfile();
    }
};
