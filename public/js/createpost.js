const savePost = document.querySelector("#savePost");

savePost.addEventListener("submit", event => {
    event.preventDefault();
   
    const userObj = {
        title: document.getElementById('postTitle').value,
        post: document.getElementById('enteredPost').value,
        userId: event.target.getAttribute('data-id')
    }

    console.log(userObj)
    fetch("/api/posts/", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            return 
            // location.reload()
            
        } else {
            location.reload();
        }
    })
})
