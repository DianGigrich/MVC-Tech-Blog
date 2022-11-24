const deleteBtn = document.querySelectorAll("deleteBtn");

for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("submit", event => {
        event.preventDefault();

        const postId = event.target.getAttribute('data-set')

        fetch(`/api/posts/${postId}`, {
            method: "DELETE",

        }).then(res => {
            if (res.ok) {
                alert("success!")
                return location.reload()
            } else {
                alert("trumpet sound")
                location.reload();
            }
        })
    })
}