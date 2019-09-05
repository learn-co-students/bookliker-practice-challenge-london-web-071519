// document.addEventListener("DOMContentLoaded", function() {});

const booksURL = 'http://localhost:3000/books'

const booksUl = document.querySelector('ul')
const booksShowDiv = document.querySelector('div#show-panel')


const getAllBooks = () => {
    fetch(booksURL)
    .then(resp => resp.json())
    .then(parseBooks)
    .catch(error => alert(error.message))
}

const parseBooks = books => {
    books.forEach(addBook)
}

const addBook = book => {
    const li = document.createElement('li')
    li.innerText = `${book.title}`
    li.addEventListener('click', event => {handleBookShowEvent(event, book)})
    booksUl.append(li)
}

const handleBookShowEvent = (event, book) => {
    booksShowDiv.innerHTML = ''
    showBook(event, book)
}

const showBook = (event, book) => {
    const bookDiv = document.createElement('div')
    const usersUl = document.createElement('ul')
    const readBtn = document.createElement('button')
    readBtn.innerText = 'Read'
    readBtn.addEventListener('click', event => handleReadBtnEvent(book, bookDiv))

    book.users.forEach(user => {
        const userLi = document.createElement('li')
        userLi.innerText = `${user.username}`
        usersUl.append(userLi)
    })
    
    bookDiv.innerHTML = `
    <h2>${book.title}</h2>
    <img src='${book.img_url}'>
    <p>${book.description}</p>
    `
    
    bookDiv.append(usersUl)
    bookDiv.append(readBtn)
    booksShowDiv.append(bookDiv)
}

const handleReadBtnEvent = (book, bookDiv) => {
    // debugger
    book.users.push({"id":1, "username":"pouros"})
    // debugger
    fetch(booksURL + '/' + book.id, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(book)
    })
    .then(resp => resp.json())
    .catch(error => alert(error.message))

    bookDiv.innerHTML = ''
    showBook(event, book)
}


getAllBooks()