const loginForm = document.querySelector("#loginForm");
console.log(loginForm, "1")
loginForm.addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        username:document.querySelector("#loginUsername").value,
        password:document.querySelector("#loginPassword").value
    }
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           return res.json();
        } else {
            alert("incorrect")
            location.reload();
        }
    }).then(data=>{
        location.href = `/user/${data.id}`
    })
})