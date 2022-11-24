

// const createUpdate = document.querySelectorAll('#createShowUpdateForm')

// for (let j = 0; j < createUpdate.length; j++) {
//     createUpdate[j].addEventListener("click", event => {
//         event.preventDefault();
//         $('.updateForm').classList.toggle("slide");

//     })
// }

const updateForm = document.querySelectorAll("updateForm");

for (let i = 0; i < updateForm.length; i++) {
    updateForm[i].addEventListener("submit", event => {
        event.preventDefault();
        // document.querySelectorAll('createFormthing').style.display = 'none';
        // postId = document.getAttribute('data-set')

        const userObj = {
            title: document.getElementById('updatedtitle').value,
            post: document.querySelector("#updatedpost").value
        }
        fetch(`/api/posts/${postId}`, {
            method: "PUT",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                alert("Jolly good ol' fellow!")
                return location.reload()
            } else {

                location.reload();
            }
        })
    })
}