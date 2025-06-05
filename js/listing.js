// שליפת דירות, סינון, חיפוש

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("listingContainer");
  const form = document.getElementById("filterForm");
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
    const roomCount = document.getElementById("roomCount").value;

    return amsterdam.filter(listing => {
      const price = listing.price || 0;
      const rating = Number(listing.review_scores_rating) || 0;
      const rooms = listing.bedrooms;
      const roomMatch = roomCount === "" || rooms == roomCount || (roomCount === "4" && rooms >= 4);
      return price >= minPrice && price <= maxPrice && rating >= minRating && roomMatch;
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

