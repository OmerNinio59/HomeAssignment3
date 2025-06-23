// // //  הוספה/ביטול השכרות, לפי currentUser


// // document.addEventListener("DOMContentLoaded", function () {
// //   const username = localStorage.getItem("currentUser");
// //   const bookingsKey = `${username}_bookings`;
// //   const bookings = JSON.parse(localStorage.getItem(bookingsKey)) || [];
// //   const container = document.getElementById("bookingsContainer");

// //   if (bookings.length === 0) {
// //     container.innerHTML = "<p>You have no bookings.</p>";
// //     return;
// //   }

// //   const today = new Date().toISOString().split("T")[0];

// //   bookings.forEach((booking, index) => {
// //     const isFuture = booking.startDate >= today;
// //     const apartment = listings.find(l => l.listing_id === booking.listingId);
// //     if (!apartment) return;

// //     const card = document.createElement("div");
// //     card.className = "booking-card";
// //     card.innerHTML = `
// //       <img src="${apartment.picture_url}" alt="${apartment.name}" />
// //       <div>
// //         <h3>${apartment.name}</h3>
// //         <p>${apartment.description}</p>
// //         <p><strong>From:</strong> ${booking.startDate} | <strong>To:</strong> ${booking.endDate}</p>
// //         <p>Status: <span style="color:${isFuture ? 'green' : 'gray'}">${isFuture ? 'Upcoming' : 'Past'}</span></p>
// //         ${isFuture ? `<button onclick="cancelBooking(${index})">Cancel</button>` : ""}
// //       </div>
// //     `;
// //     container.appendChild(card);
// //   });
// // });

// // function cancelBooking(index) {
// //   const username = localStorage.getItem("currentUser");
// //   const bookingsKey = `${username}_bookings`;
// //   let bookings = JSON.parse(localStorage.getItem(bookingsKey)) || [];
// //   if (index >= 0 && index < bookings.length) {
// //     if (confirm("Are you sure you want to cancel this booking?")) {
// //       bookings.splice(index, 1);
// //       localStorage.setItem(bookingsKey, JSON.stringify(bookings));
// //       location.reload();
// //     }
// //   }
// // }


// // document.addEventListener("DOMContentLoaded", function () {
// //   const username = localStorage.getItem("currentUser");
// //   if (!username) return;

// //   const bookingsKey = `${username}_bookings`;
// //   const bookings = JSON.parse(localStorage.getItem(bookingsKey)) || [];
// //   const container = document.getElementById("bookingsContainer");

// //   if (!container) return;

// //   if (bookings.length === 0) {
// //     container.innerHTML = "<p>You have no bookings.</p>";
// //     return;
// //   }

// //   const today = new Date().toISOString().split("T")[0];

// //   bookings.forEach((booking, index) => {
// //     const isFuture = booking.startDate >= today;
// //     const apartment = listings.find(l => l.listing_id === booking.listingId);
// //     if (!apartment) return;

// //     const card = document.createElement("div");
// //     card.className = "booking-card";
// //     card.innerHTML = `
// //       <img src="${apartment.picture_url}" alt="${apartment.name}" />
// //       <div class="booking-info">
// //         <h3>${apartment.name}</h3>
// //         <p>${apartment.description}</p>
// //         <p><strong>From:</strong> ${booking.startDate} | <strong>To:</strong> ${booking.endDate}</p>
// //         <p>Status: <span style="color:${isFuture ? 'green' : 'gray'}">${isFuture ? 'Upcoming' : 'Past'}</span></p>
// //         ${isFuture ? `<button onclick="cancelBooking(${index})">Cancel</button>` : ""}
// //       </div>
// //     `;
// //     container.appendChild(card);
// //   });
// // });

// // function cancelBooking(index) {
// //   const username = localStorage.getItem("currentUser");
// //   const bookingsKey = `${username}_bookings`;
// //   let bookings = JSON.parse(localStorage.getItem(bookingsKey)) || [];

// //   if (index >= 0 && index < bookings.length) {
// //     if (confirm("Are you sure you want to cancel this booking?")) {
// //       bookings.splice(index, 1);
// //       localStorage.setItem(bookingsKey, JSON.stringify(bookings));
// //       location.reload();
// //     }
// //   }
// // }

// document.addEventListener("DOMContentLoaded", function () {
//   const username = localStorage.getItem("currentUser");
//   if (!username) return;

//   // ודא שקיים מערך הדירות, נניח שנטען מ-amsterdam.js
//   const listings = typeof amsterdam !== "undefined" ? amsterdam : [];

//   const bookingsKey = `${username}_bookings`;
//   const bookings = JSON.parse(localStorage.getItem(bookingsKey)) || [];

//   const container = document.getElementById("bookingsContainer");
//   if (!container) return;

//   if (bookings.length === 0) {
//     container.innerHTML = "<p>You have no bookings.</p>";
//     return;
//   }

//   const today = new Date().toISOString().split("T")[0];

//   bookings.forEach((booking, index) => {
//     const isFuture = booking.startDate >= today;
//     const apartment = listings.find(l => l.listing_id == booking.listingId);

//     if (!apartment) return;

//     const card = document.createElement("div");
//     card.className = "booking-card";

//     card.innerHTML = `
//       <img src="${apartment.picture_url}" alt="${apartment.name}" />
//       <div class="booking-info">
//         <h3>${apartment.name}</h3>
//         <p>${apartment.description || "No description available."}</p>
//         <p><strong>From:</strong> ${booking.startDate} | <strong>To:</strong> ${booking.endDate}</p>
//         <p>Status: 
//           <span style="color:${isFuture ? 'green' : 'gray'}">
//             ${isFuture ? 'Upcoming' : 'Past'}
//           </span>
//         </p>
//         ${
//           isFuture
//             ? `<button onclick="cancelBooking(${index})">Cancel</button>`
//             : ""
//         }
//       </div>
//     `;

//     container.appendChild(card);
//   });
// });

// function cancelBooking(index) {
//   const username = localStorage.getItem("currentUser");
//   const bookingsKey = `${username}_bookings`;
//   let bookings = JSON.parse(localStorage.getItem(bookingsKey)) || [];

//   if (index >= 0 && index < bookings.length) {
//     const confirmCancel = confirm("Are you sure you want to cancel this booking?");
//     if (confirmCancel) {
//       bookings.splice(index, 1);
//       localStorage.setItem(bookingsKey, JSON.stringify(bookings));
//       location.reload();
//     }
//   }
// }



document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("currentUser");
  if (!username) return;

  const listings = typeof amsterdam !== "undefined" ? amsterdam : [];

  const bookingsKey = `${username}_bookings`;
  const bookings = JSON.parse(localStorage.getItem(bookingsKey)) || [];

  const container = document.getElementById("bookingsContainer");
  if (!container) return;

  if (bookings.length === 0) {
    container.innerHTML = "<p>You have no bookings.</p>";
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  bookings.forEach((booking, index) => {
    const isFuture = booking.startDate >= today;
    const apartment = listings.find(l => l.listing_id == booking.listingId);
    if (!apartment) return;

    const card = document.createElement("div");
    card.className = "booking-card";

    const statusColor = isFuture ? "green" : "gray";
    const statusText = isFuture ? "Upcoming" : "Past";

    const actionButton = isFuture
      ? `<button onclick="cancelBooking(${index})">Cancel</button>`
      : `<button onclick="deletePastBooking(${index})">Delete</button>`;

    card.innerHTML = `
      <img src="${apartment.picture_url}" alt="${apartment.name}" />
      <div class="booking-info">
        <h3>${apartment.name}</h3>
        <p>${apartment.description || "No description available."}</p>
        <p><strong>From:</strong> ${booking.startDate} | <strong>To:</strong> ${booking.endDate}</p>
        <p>Status: <span style="color:${statusColor}">${statusText}</span></p>
        ${actionButton}
      </div>
    `;

    container.appendChild(card);
  });
});

function cancelBooking(index) {
  const username = localStorage.getItem("currentUser");
  const bookingsKey = `${username}_bookings`;
  let bookings = JSON.parse(localStorage.getItem(bookingsKey)) || [];

  if (index >= 0 && index < bookings.length) {
    if (confirm("Are you sure you want to cancel this booking?")) {
      bookings.splice(index, 1);
      localStorage.setItem(bookingsKey, JSON.stringify(bookings));
      location.reload();
    }
  }
}

function deletePastBooking(index) {
  const username = localStorage.getItem("currentUser");
  const bookingsKey = `${username}_bookings`;
  let bookings = JSON.parse(localStorage.getItem(bookingsKey)) || [];

  if (index >= 0 && index < bookings.length) {
    if (confirm("Do you want to delete this past booking?")) {
      bookings.splice(index, 1);
      localStorage.setItem(bookingsKey, JSON.stringify(bookings));
      location.reload();
    }
  }
}
