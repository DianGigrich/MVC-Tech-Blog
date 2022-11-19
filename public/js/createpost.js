const loginForm = document.querySelector("#postForm");
loginForm.addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        title:document.querySelector("#postTitle").value,
        post:document.querySelector("#postPost").value
    }
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           alert("success!")
           return res.json();
        } else {
            alert("trumpet sound")
            location.reload();
        }
    }).then(data=>{
        location.href = `/user/${data.id}`
    })
})