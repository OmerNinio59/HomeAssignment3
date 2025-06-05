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
    window.localStorage.href = "login.html";
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
   

// הצגת דירות עם כפתור FILTER
  function displayListings(listings) {
    const container = document.getElementById("listings-container");
    container.innerHTML = "";

    if (listings.length === 0) {
        container.innerHTML = "<p>No listings found that matth the criteria!</p>";
    } else {
        listings.forEach(listing => {
            const card = document.createElement("div");
            card.className = "listing-card";
            card.innerHTML = /**note the comments!!!!!!!! || נועד להצגת מידע לדירה שנמצאה בחיפוש**/
            `
                <h3>${listing.name}</h3>
                <p>${listing.d}</p>
                <img src="${/***listing picture url add later***/}" alt="${listing.name}"/> 
                <p>Price: ${listing.price}</p>
                <p>Score: ${listing.score}</p>
                <p>Rooms: ${listing.rooms}</p>
                <a href="${/***listing url add later***/}" class="btn">View Listings</a>
                <button class="btn" onclick="addToFavorites(${listing.listing_id})">Add to favorites</button>
            `;

            container.appendChild(card);
        });
    }
   }

   // ערכים לסינון דירות
   document.querySelector(".btn").addEventListener("click", function() {
        const minScore = document.getElementById("scoreChoice").value;
        const minPrice = document.getElementById("minPrice").value;
        const maxPrice = document.getElementById("maxPrice").value;
        const numOfRooms = document.getElementById("roomNumber").value;

        const listingsFiltered = amsterdam.filter(listing => {
            return (
                (minScore && listing.score >= minScore) &&
                (minPrice && listing.price >= minPrice) &&
                (maxPrice && listing.price <= maxPrice) &&
                (numOfRooms && listing.rooms === parseInt(numOfRooms))
            );
        });

        displayListings(listingsFiltered);
   });