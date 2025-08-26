function register() {
    let user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        links: []
    };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Зарегался, брателло! АУЕ!');
}

function login() {
    let savedUser = JSON.parse(localStorage.getItem('user'));
    let inputUsername = document.getElementById('username').value;
    let inputPassword = document.getElementById('password').value;

    if (savedUser && savedUser.username === inputUsername && savedUser.password === inputPassword) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        loadLinks();
    } else {
        alert('Неверный логин/пароль, ёбана!');
    }
}

function addLink() {
    let link = document.getElementById('linkInput').value;
    let user = JSON.parse(localStorage.getItem('user'));
    user.links.push(link);
    localStorage.setItem('user', JSON.stringify(user));
    loadLinks();
}

function loadLinks() {
    let user = JSON.parse(localStorage.getItem('user'));
    let list = document.getElementById('linksList');
    list.innerHTML = '';
    user.links.forEach(link => {
        let li = document.createElement('li');
        li.textContent = link;
        list.appendChild(li);
    });
}
