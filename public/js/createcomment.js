
const commentForm = document.querySelector("#commentForm");

commentForm.addEventListener("submit", event => {
    event.preventDefault();

    const userObj = {
        comment: document.querySelector("#enteredComment").value,
        postId: event.target.getAttribute('data-id')
    }
    console.log(userObj)
    fetch("/api/comments/", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {

            return location.reload()
        } else {
            location.reload();
        }
    })
})

