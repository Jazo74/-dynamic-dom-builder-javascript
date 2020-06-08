// const BASE_URL = 'https://jsonplaceholder.typicode.com';

// let usersDivEl;
// let postsDivEl;
// let commentsDivEl;
// let loadButtonEl;

function createAlbumsList(albums) {
    const ulEl = document.createElement('ul');
    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];
        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = album.id;

        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`: ${album.title}`));

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onAlbumsReceived() { // feldolgozza a JSON adatokat
    postsDivEl.style.display = 'block';

    const text = this.responseText;
    const albums = JSON.parse(text);
    console.log(text);
    const divEl = document.getElementById('posts-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createAlbumsList(albums));
}

function onLoadAlbums() { // adatlekérést indít el a userhez tartozó postokra 
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAlbumsReceived); // ha lejöttek a post adatai, függvényt indít
    xhr.open('GET', BASE_URL + '/albums?userId=' + userId);
    xhr.send();
}

function createPostsListOLD(posts) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = post.title;

        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`: ${post.body}`));

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onPostsReceived() { // feldolgozza a JSON adatokat
    postsDivEl.style.display = 'block';

    const text = this.responseText;
    const posts = JSON.parse(text);

    const divEl = document.getElementById('posts-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPostsList(posts));
}

function onLoadPosts() { // adatlekérést indít el a userhez tartozó postokra 
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostsReceived); // ha lejöttek a post adatai, függvényt indít
    xhr.open('GET', BASE_URL + '/posts?userId=' + userId);
    xhr.send();
}

function createUsersTableHeader() { // a users táblázat fejlécét készíti
    const idTdEl = document.createElement('td');
    idTdEl.textContent = 'Id';

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = 'Name';

    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createUsersTableBody(users) { // a users tablazat törzsét készíti
    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = user.id;

        // creating name cell
        const dataUserIdAttr = document.createAttribute('data-user-id');
        dataUserIdAttr.value = user.id;
     
        const buttonEl = document.createElement('button');
        buttonEl.textContent = user.name;
        buttonEl.setAttributeNode(dataUserIdAttr);
        buttonEl.addEventListener('click', onLoadPosts); // kattintásra függvényt indít

        const dataUserIdAttr2 = document.createAttribute('data-user-id');
        dataUserIdAttr2.value = user.id;

        const buttonEl2 = document.createElement('button');
        buttonEl2.textContent = user.name + "'s albums";
        buttonEl2.setAttributeNode(dataUserIdAttr2);
        buttonEl2.addEventListener('click', onLoadAlbums); // kattintásra függvényt indít

        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);
        nameTdEl.appendChild(buttonEl2);

        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createUsersTable(users) { // elkezdi a users táblázat készítését
    const tableEl = document.createElement('table');
    tableEl.appendChild(createUsersTableHeader());
    tableEl.appendChild(createUsersTableBody(users));
    return tableEl;
}

function onUsersReceived() { // ha megjottek a users adatok a kiszolgálótól
    loadButtonEl.remove();

    const text = this.responseText;
    const users = JSON.parse(text);

    const divEl = document.getElementById('users-content');
    divEl.appendChild(createUsersTable(users));
}

function onLoadUsers() { // adatlekérést indít el a userekre
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersReceived);
    xhr.open('GET', BASE_URL + '/users');
    xhr.send();
}

document.addEventListener('DOMContentLoaded', (event) => { // A HTML parsingbetöltődés után
    usersDivEl = document.getElementById('users');
    postsDivEl = document.getElementById('posts');
    commentsDivEl = document.getElementById('comments-content');
    loadButtonEl = document.getElementById('load-users');
    loadButtonEl.addEventListener('click', onLoadUsers); // kattintásra fügvényt indít
});