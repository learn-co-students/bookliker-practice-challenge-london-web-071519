document.addEventListener("DOMContentLoaded", function() {
});

const BOOKSURL = 'http://localhost:3000/books'

function fetchBooks() {
    return fetch(BOOKSURL)
    .then(resp => resp.json());
}

function showBook(book) {
    let showPanel = document.querySelector('#show-panel');
    showPanel.innerHTML = ""
    let showDiv = document.createElement('div');
    showDiv.innerHTML = `
        <h2>${book.title}</h2>
        <img src=${book.img_url}>
        <p>${book.description}
    `;
    let readButton = document.createElement('button')
    readButton.innerText = 'Read Book'
    readButton.addEventListener('click', e => {
        // debugger
        if (!document.querySelector('#myUserList')) {
        dataObject = book.users
        dataObject.push({id: 1, username:"pouros"})
        
        fetch(`${BOOKSURL}/1`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"users": dataObject})
        }).then(resp => resp.json())
        .then(obj => {
            let userArray = obj.users
            let usersReadList = document.createElement('div')
            usersReadList.id = "myUserList"
            showPanel.append(usersReadList)
            userArray.forEach(user => {
                let usersRead = document.createElement('p')
                usersRead.innerHTML = `${user.username} <br>`
                usersReadList.append(usersRead)
                showPanel.append(usersReadList)
            });} 
        )
        showPanel.append(showDiv);
        showPanel.append(readButton)} else {
            alert(`You read this already!`)
        }
    })
    showPanel.append(showDiv);
    showPanel.append(readButton)}
}

function renderBooks() {
    let bookDiv = document.querySelector('#list-panel')
    bookDiv.innerHTML = ""
    fetchBooks().then(books => {
        books.forEach(book => {
            let bookEle = document.createElement('li')
            bookEle.innerHTML = `${book.title}`
            bookEle.addEventListener('click', e => {
                showBook(book)
            })
            bookDiv.append(bookEle)
        });
    })
}

renderBooks()

// "title": "Picture Perfect",
// "description": "When her seven-year-old nephew, a 
// hemophiliac, mysteriously disappears during their camping trip, 
// pediatrician Lorrie Ryan races against time to find the missing 
// boy with the help of FBI agent Stuart Saunders. Previously published 
// as Panda Bear Is Critical. Reprint.",
// "img_url": "http://books.google.com/books/content?id=CEMZ1OoPDIAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",