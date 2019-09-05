document.addEventListener("DOMContentLoaded", function() {});
const booksURL = 'http://localhost:3000/books'
const listPanel = document.querySelector('#list-panel')
const list = document.querySelector('#list')
let showPanel = document.querySelector('#show-panel')

function renderBooks(){
    return fetch(booksURL)
    .then(resp => resp.json())
    .then(books => books.forEach(book=> renderBook(book)))
    .catch(error => alert(error.message))
}

function renderBook(book){
    let liEl = document.createElement('li')
    liEl.innerText = book.title
    liEl.addEventListener('click', event =>{
        showPanel.innerHTML = ""
        let h1El = document.createElement('h1')
        h1El.innerText = book.title
        let imgEl = document.createElement('img')
        imgEl.src = book.img_url
        let h3El = document.createElement('h3')
        h3El.innerText = book.description
        h4El = document.createElement('h4')
        h4El.innerText = `User whos liked this book: ${book.users[0].username}, ${book.users[1].username}`
            let likeButton = document.createElement('button')
            likeButton.innerText = `Like ${book.title}`
            likeButton.addEventListener('click', event => {
                return fetch(`${booksURL}/${book.id}`,{
                    method: 'PATCH',
                    headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        "users": [
                            {"id":`${book.users[0].id}`, "username":`${book.users[0].username}`},
                            {"id":`${book.users[0].id}`, "username":`${book.users[0].username}`},
                            {"id":1, "username":"pouros"}
                            ]
                    })
                })
                .then(resp => resp.json())
                .then(h4El.innerText = `User whos liked this book: ${book.users[0].username}, ${book.users[1].username}, pouros`)
            })
        showPanel.appendChild(h1El)
        showPanel.appendChild(imgEl)
        showPanel.appendChild(h3El)
        showPanel.appendChild(h4El)
        showPanel.appendChild(likeButton)
    })
    listPanel.append(liEl)
}

renderBooks()