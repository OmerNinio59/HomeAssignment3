// שליפת דירות, סינון, חיפוש

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".intro-grid");

  // יצירת הטופס הדינמי
  const loginBox = document.createElement("div");
  loginBox.className = "login-box";

  const heading = document.createElement("h3");
  heading.textContent = "Fill your Preferences";
  loginBox.appendChild(heading);

  const form = document.createElement("form");
  form.id = "filterForm";

  const minRating = document.createElement("input");
  minRating.type = "number";
  minRating.className = "fill-detail";
  minRating.id = "minRating";
  minRating.placeholder = "Min Rating";
  minRating.min = "0";
  minRating.max = "5";
  minRating.step = "0.1";
  form.appendChild(minRating);

  const minPrice = document.createElement("input");
  minPrice.type = "number";
  minPrice.className = "fill-detail";
  minPrice.id = "minPrice";
  minPrice.placeholder = "Min Price";
  form.appendChild(minPrice);

  const maxPrice = document.createElement("input");
  maxPrice.type = "number";
  maxPrice.className = "fill-detail";
  maxPrice.id = "maxPrice";
  maxPrice.placeholder = "Max Price";
  form.appendChild(maxPrice);

  const minRooms = document.createElement("input");
  minRooms.type = "number";
  minRooms.className = "fill-detail";
  minRooms.id = "minRooms";
  minRooms.placeholder = "Number of Rooms";
  minRooms.min = "1";
  form.appendChild(minRooms);

  const filterBtn = document.createElement("button");
  filterBtn.className = "btn";
  filterBtn.type = "submit";
  filterBtn.textContent = "Filter";
  form.appendChild(filterBtn);

  loginBox.appendChild(form);
  section.appendChild(loginBox);

  // לאחר יצירת הטופס – ממשיכים לשאר הקוד
  const container = document.getElementById("listingContainer");
  const currentUser = localStorage.getItem("currentUser");
  const favKey = `${currentUser}_favorites`;
  let favorites = JSON.parse(localStorage.getItem(favKey)) || [];

  function renderListings(data) {
    container.innerHTML = "";
    if (data.length === 0) {
      container.innerHTML = "<p>No listings found.</p>";
      return;
    }
    data.forEach(listing => {
      const isFav = favorites.includes(listing.listing_id);
      const card = document.createElement("div");
      card.className = "listing-card";
      card.innerHTML = `
        <img src="${listing.picture_url}" alt="${listing.name}" />
        <div class="listing-info">
          <h3>${listing.name}</h3>
          <table class="listing-table">
            <tr><td>License:</td><td>${listing.license || "N/A"}</td></tr>
            <tr><td>Price:</td><td>$${listing.price}</td></tr>
            <tr><td>Rating:</td><td>${listing.review_scores_rating || "N/A"}</td></tr>
            <tr><td>Rooms:</td><td>${listing.bedrooms || "N/A"}</td></tr>
          </table>
          <ul class="listing-description">
            ${(listing.description || "").split(".").filter(s => s.trim()).map(s => `<li>${s.trim()}</li>`).join("")}
          </ul>
          <div class="listing-actions">
            <button class="rent-btn" onclick="location.href='rent.html?id=${listing.listing_id}'">Rent</button>
            <button class="fav-btn" data-id="${listing.listing_id}">
              ${isFav ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        const index = favorites.indexOf(id);
        if (index === -1) {
          favorites.push(id);
        } else {
          favorites.splice(index, 1);
        }
        localStorage.setItem(favKey, JSON.stringify(favorites));
        renderListings(filteredData);
      });
    });
  }

  function filterListings() {
    const minRating = parseFloat(document.getElementById("minRating").value) || 0;
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
    const minRooms = parseInt(document.getElementById("minRooms").value) || 0;

    return amsterdam.filter(listing => {
      const price = parseFloat((listing.price || "0").replace(/[^\d.]/g, "")) || 0;
      const rating = parseFloat(listing.review_scores_rating) || 0;
      const rooms = Number(listing.bedrooms) || 0;
      const roomMatch = rooms >= minRooms;

      return price >= minPrice &&
             price <= maxPrice &&
             rating >= minRating &&
             roomMatch;
    });
  }

  let filteredData = amsterdam;
  renderListings(filteredData);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    filteredData = filterListings();
    renderListings(filteredData);
  });
});
