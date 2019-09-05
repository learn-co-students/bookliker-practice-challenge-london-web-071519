document.addEventListener("DOMContentLoaded", fetchBooks)


const showPanel = document.querySelector("#show-panel")

const sidePanel = document.querySelector("#list-panel")
const uL = document.querySelector('#list')

function fetchBooks() {
    return fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(listBooks)
}

function listBooks(books) {
    books.forEach(book => showBookPanel(book))
}

function showBookPanel(book) {
    let li = document.createElement('li')
    li.innerHTML = `${book.title}`
    li.addEventListener('click', e => showBook(e, book))
    uL.append(li)
}

function showBook(e, book) {
    showPanel.innerHTML = ""
    let likeBtn = document.createElement('button')
    showPanel.innerHTML = `
        <h1>${book.title}</h1>
        <img src = "${book.img_url}">
        <p>${book.description}<p>`   
        book.users.forEach(user => {
        let liUser = document.createElement('li')
        liUser.className = "userLi"
        liUser.innerText = `${user.username}`
        showPanel.append(liUser)
    })
    likeBtn.innerText = "Read Book"
    likeBtn.addEventListener('click', e => {
        bookUser = book.users
       // if (bookUser.some(user.id === 1)) 
        bookUser.push(
            {"id":1, 
        "username":"pouros"})
        return fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH", 
            headers: {
                "content-type": "application/json"
            }, 
            body: JSON.stringify({
                 users: bookUser
            }) 
        }) 
       .then(showBook(e, book))
    })
    showPanel.append(likeBtn)
}

// function reloadBook(e) {
//     e.target.parentElement.lastElementChild.previousSibling.append(e.) 
// }
// function bookLikedUser(book) {
//     book.users.forEach(user => {
//         if (book.user.id === 1) {
//             alert("You already liked this book")
//         } 
//         else addUser(book) )
//      }

function addUser(book) {
    // book.users.forEach(user => {
    //     if (book.user.id === 1) {
    //         alert("You already liked this book")
    //     } 
    //     else
    // fetch(`http://localhost:3000/books/${book.id}`, {
    //     method: "PATCH", 
    //     headers: {
    //         "content-type": "application/json"
    //     }, 
    //     body: JSON.stringify({
    //         users: book.user
    //     })}) 
    // .then(resp => resp.json())
    // .then(showBook(book))
}

// function addUser(e) {

//    // if showPanel.innerHTML.childElement 
// }