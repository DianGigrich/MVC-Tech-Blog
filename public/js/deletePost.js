const deleteBtn = document.querySelectorAll("deleteBtn");

for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", event => {
        event.preventDefault();

        const postId = event.target.getAttribute('data-set')

console.log(postId)
        fetch(`/api/posts/${postId}`, {
            method: "DELETE",

        }).then(res => {
            if (res.ok) {

                return 
                // location.reload()
            } else {

                location.reload();
            }
        })
    })
}