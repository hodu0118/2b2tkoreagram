let feed = document.getElementById("feed")

function createPost(){

let username = document.getElementById("username").value
let title = document.getElementById("title").value
let image = document.getElementById("image").value
let desc = document.getElementById("desc").value

let post = document.createElement("div")
post.className = "post"

post.innerHTML = `
<img src="${image}">
<h3>${title}</h3>
<p>${desc}</p>
<p>👤 ${username}</p>
<p class="likes" onclick="like(this)">❤️ 0 Likes</p>
`

feed.prepend(post)

}

function like(el){

let num = parseInt(el.innerText.split(" ")[1])
num++

el.innerText = "❤️ " + num + " Likes"

}
