// פונקציות כלליות לעבודה עם localStorage


// הצגת דירות עם כפתור FILTER
  function displayListings(listings) {
    const container = document.getElementById("listings-container");
    container.innerHTML = "";

    if (listings.length === 0) {
        container.innerHTML = "<p> No listings found that matth the criteria! </p>";
    } else {
        listings.forEach(listing => {
            const card = document.createElement("div");
            card.className = "listing-card";
            card.innerHTML = 
            `
                <h3>${listing.name}</h3>
                <p>${listing.d}</p>
                <img src="${listing.rooms}" alt="${listing.name}"/> 
                <p>Price: ${listing.price}</p>
                <p>Score: ${listing.score}</p>
                <p>Rooms: ${listing.rooms}</p>
                <a href="${listing.rooms}" class="btn">View Listings</a>
                <button class="btn" onclick="addToFavorites(${listing.listing_id})">Add to favorites</button>
            `;

            container.appendChild(card);
        });
    }
   }

// כפתור התנתקות, הפנייה ללוגין במידה ולא מחובר
   function signOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
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