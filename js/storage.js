document.addEventListener("DOMContentLoaded", function () {
  const currentUser = localStorage.getItem("currentUser");

  // אם המשתמש לא מחובר – להפנות ל-login (בכל דף פרט ל-login/register)
  const isLoginPage = location.href.includes("login") || location.href.includes("register");
  if (!currentUser && !isLoginPage) {
    window.location.href = "login.html";
    return;
  }

// כפתור התנתקות, הפנייה ללוגין במידה ולא מחובר
   function signOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
   }

  // הצגת שם המשתמש המחובר
  const userNameElement = document.getElementById("userName");
  if (userNameElement && currentUser) {
    userNameElement.textContent = `Hi, ${currentUser}`;
  }

  // טיפול בלחיצה על Sign Out
  const signOutBtn = document.getElementById("signOut");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  }
});

   window.onload = function () {
    const userName = localStorage.getItem("currentUser");
    if (!userName) {
        window.location.href = "login.html";
    } else {
        document.getElementById("userName").textContent = `Hi, ${userName}`;
    }
   }
   

