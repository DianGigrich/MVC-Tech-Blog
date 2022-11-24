
// const updateForm = document.querySelectorAll("updateForm");

// for (let i = 0; i < updateForm.length; i++) {
//     updateForm[i].addEventListener("submit", event => {
//         event.preventDefault();
 // document.querySelector('createFormthing').style.display = 'none';
//         postId = document.getAttribute('data-set')

//         const userObj = {
//             title: document.getElementById('updatedtitle').value,
//             post: document.querySelector("#updatedpost").value
//         }
//         fetch(`/api/posts/${postId}`, {
//             method: "PUT",
//             body: JSON.stringify(userObj),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }).then(res => {
//             if (res.ok) {
//                 alert("success!")
//                 return res.json(), location.reload()
//             } else {
//                 alert("trumpet sound")
//                 location.reload();
//             }
//         })
//     })
// }