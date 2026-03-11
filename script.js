let feed = document.getElementById("feed")

let posts = JSON.parse(localStorage.getItem("posts")) || []

renderPosts()

function createPost(){

let username = document.getElementById("username").value
let title = document.getElementById("title").value
let desc = document.getElementById("desc").value
let tag = document.getElementById("tag").value
let file = document.getElementById("imageFile").files[0]

let reader = new FileReader()

reader.onload = function(e){

let post = {

username,
title,
desc,
tag,
image:e.target.result,
likes:0,
comments:[]

}

posts.unshift(post)

save()

renderPosts()

}

if(file){
reader.readAsDataURL(file)
}

}

function renderPosts(){

feed.innerHTML=""

posts.forEach((post,index)=>{

let div = document.createElement("div")
div.className="post"

div.innerHTML=`

<img src="${post.image}">
<p><b>${post.title}</b></p>

<span class="tag">${post.tag}</span>

<p>${post.desc}</p>

<p>👤 ${post.username}</p>

<p class="likes" onclick="likePost(${index})">❤️ ${post.likes}</p>

<div id="comments-${index}">
${post.comments.map(c=>`<div class="comment">💬 ${c}</div>`).join("")}
</div>

<input class="commentInput" placeholder="댓글..." onkeypress="commentEnter(event,${index},this)">

`

feed.appendChild(div)

})

}

function likePost(index){

posts[index].likes++

save()

renderPosts()

}

function commentEnter(event,index,input){

if(event.key==="Enter"){

let text=input.value.trim()

if(!text) return

posts[index].comments.push(text)

input.value=""

save()

renderPosts()

}

}

function save(){

localStorage.setItem("posts",JSON.stringify(posts))

}
