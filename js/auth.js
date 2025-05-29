//  הרשמה והתחברות (usersList, currentUser)

document.getElementById("registerBtn").addEventListener("click", function() {
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

  if (password != rePassword) {
    errorMsg.textContent = "Passwords do not match!";
    return;
  }

  let userExists = false;
  for (let i=0; i < usersList.length; i++) {
    if (usersList[i].userName === userName) {
        userExists = true;
        break;
    }
  }

  if (userExists) {
    errorMsg.textContent = "User name alredy exsits!";
    return;       
  }

  usersList.push({ userName, password });
    localStorage.setItem("usersList", JSON.stringify(usersList));
    localStorage.setItem("currentUser", JSON.stringify(userName));
});