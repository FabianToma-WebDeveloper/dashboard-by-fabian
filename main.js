function login(){

const user =
document.getElementById("username").value;

const pass =
document.getElementById("password").value;


// demo login

if(user === "rosa" && pass === "nera"){

localStorage.setItem(
"logged",
"true"
);


window.location.href =
"dashboard.html";


}else{


document.getElementById("error")
.innerHTML =
"Access denied";


}

}


// protect dashboard

if(
window.location.pathname.includes("dashboard.html")
&&
!localStorage.getItem("logged")
){

window.location.href="index.html";

}



//LOGOUT BUTTON 

function logout(){

    localStorage.removeItem("logged");

    window.location.href = "index.html";

}
