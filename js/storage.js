// פונקציות כלליות לעבודה עם localStorage

   function signOut() {
    localStorage.removeItem("currentUser");
    window.localStorage.href = "login.html";
   }

    if (!localStorage.getItem("currentUser")) {
        const page = window.location.pathname;
    if (!page.includes("login") && !page.includes("register")) {
     window.location.href = "login.html";
    }        
   }

   window.onload = function () {
    const userName = localStorage.getItem("currentUser");
    if (!userName) {
        window.location.href = "login.html";
    } else {
        document.getElementById("userName").textContent = `Hi, ${userName}`;
    }
   }