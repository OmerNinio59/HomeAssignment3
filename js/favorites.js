// ניהול מועדפים לפי currentUser


document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("favoritesContainer");
  const currentUser = localStorage.getItem("currentUser");
  const favKey = `${currentUser}_favorites`;
  let favorites = JSON.parse(localStorage.getItem(favKey)) || [];

  function renderFavorites() {
    container.innerHTML = "";

    if (favorites.length === 0) {
      container.innerHTML = "<p>You have no favorite listings.</p>";
      return;
    }

    const favoriteListings = amsterdam.filter(listing => favorites.includes(listing.listing_id));

    favoriteListings.forEach(listing => {
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
            <button onclick="location.href='rent.html?id=${listing.listing_id}'">Rent</button>
            <button data-id="${listing.listing_id}" class="remove-fav">Remove from Favorites</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".remove-fav").forEach(button => {
      button.addEventListener("click", function () {
        const id = this.dataset.id;
        favorites = favorites.filter(favId => favId !== id);
        localStorage.setItem(favKey, JSON.stringify(favorites));
        renderFavorites();
      });
    });
  }

  renderFavorites();
});


