// auth.js – רישום והתחברות למערכת

document.addEventListener("DOMContentLoaded", function () {
  // רישום משתמש חדש
  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      const userName = document.getElementById("UserName").value.trim();
      const password = document.getElementById("NewPassword").value;
      const rePassword = document.getElementById("CheckPassword").value;
      const errorMsg = document.getElementById("error-message");

      let usersList = JSON.parse(localStorage.getItem("usersList")) || [];

      if (!userName || !password || !rePassword) {
        errorMsg.textContent = "Please fill all fields.";
        return;
      }

      if (userName.length < 3) {
        errorMsg.textContent = "User name must be at least 3 characters!";
        return;
      }

      if (password.length < 8) {
        errorMsg.textContent = "Password must be at least 8 characters!";
        return;
      }

      if (password !== rePassword) {
        errorMsg.textContent = "Passwords do not match!";
        return;
      }

      const userExists = usersList.some(u => u.userName === userName);
      if (userExists) {
        errorMsg.textContent = "User name already exists!";
        return;
      }

      usersList.push({ userName, password });
      localStorage.setItem("usersList", JSON.stringify(usersList));
      localStorage.setItem("currentUser", userName);
      window.location.href = "index.html";
    });
  }

  // התחברות משתמש קיים
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      const userName = document.getElementById("UserName").value.trim();
      const password = document.getElementById("Password").value;
      const errorMsg = document.getElementById("error-message");

      let usersList = JSON.parse(localStorage.getItem("usersList")) || [];

      const userFound = usersList.find(
        (u) => u.userName === userName && u.password === password
      );

      if (userFound) {
        localStorage.setItem("currentUser", userName);
        window.location.href = "index.html";
      } else {
        errorMsg.textContent = "Invalid username or password!";
      }
    });
  }
});