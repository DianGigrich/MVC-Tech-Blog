const deleteBtn = document.querySelectorAll("deleteBtn");

for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", event => {
        event.preventDefault();

        postId: event.target.getAttribute('data-bs-target').value

        fetch(`/api/posts/${postId}`, {
            method: "DELETE",

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