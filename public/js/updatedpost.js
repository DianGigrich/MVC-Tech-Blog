
const updateBtn = document.querySelectorAll(".updateForm");

for (let i = 0; i < updateBtn.length; i++) {
    updateBtn[i].addEventListener("submit", event => {
        event.preventDefault();
        console.log("click")

        postId = event.target.getAttribute('data-set')
        console.log(postId)

 
        const userObj = {
            title: document.getElementById('updatedtitle').value,
            post: document.getElementById("updatedpost").value
        }

        console.log(userObj)
        fetch(`/api/posts/${postId}`, {
            method: "PUT",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                return  location.reload()
            } else {
                location.reload();
            }
        })
    })
}
