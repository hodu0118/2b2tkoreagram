let posts = JSON.parse(localStorage.getItem("koreagramPosts")) || []

let feed = document.getElementById("feed")

render()

function createPost(){

let username = document.getElementById("username").value
let file = document.getElementById("imageFile").files[0]

if(!file) return

let reader = new FileReader()

reader.onload=function(e){

let post={

user:username,
image:e.target.result,
likes:0,
comments:[]

}

posts.unshift(post)

save()

render()

}

reader.readAsDataURL(file)

}

function render(){

feed.innerHTML=""

posts.forEach((p,i)=>{

let div=document.createElement("div")

div.className="post"

div.innerHTML=`

<div class="postHeader">👤 ${p.user}</div>

<img src="${p.image}">

<div class="postActions">

<span class="like" onclick="like(${i})">❤️ ${p.likes}</span>

</div>

<div>

${p.comments.map(c=>`<div class="comment">💬 ${c}</div>`).join("")}

</div>

<input class="commentInput" placeholder="댓글..." onkeypress="comment(event,${i},this)">

`

feed.appendChild(div)

})

}

function like(i){

posts[i].likes++

save()

render()

}

function comment(e,i,input){

if(e.key==="Enter"){

let text=input.value.trim()

if(text==="") return

posts[i].comments.push(text)

input.value=""

save()

render()

}

}

function save(){

localStorage.setItem("koreagramPosts",JSON.stringify(posts))

}
