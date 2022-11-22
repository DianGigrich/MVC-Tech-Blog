TODO:
const savePost = document.querySelectorAll("#savePost");

for (let i = 0; i < savePost.length; i++) {
    savePost[i].addEventListener("submit", event => {
        event.preventDefault();

        const userObj = {
            title: document.getElementById('postTitle').value,
            post: document.querySelector("#enteredpost").value
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