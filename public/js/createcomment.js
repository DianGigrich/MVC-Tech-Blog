
const commentForm = document.querySelectorAll("#commentForm");

for (let i = 0; i < commentForm.length; i++) {
    commentForm[i].addEventListener("click", event => {
        event.preventDefault();

        const userObj = {
            comment: document.querySelector("#enteredComment").value,
            postId: event.target.getAttribute('data-bs-target').value
        }
        fetch("/api/comments/", {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                alert("success!")
                return res.json(), location.reload()
            } else {
                alert("trumpet sound")
                location.reload();
            }
        })
    })
}
